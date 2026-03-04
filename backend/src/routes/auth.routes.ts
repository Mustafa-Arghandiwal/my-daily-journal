import { Router } from "express"
const router = Router()
import db from "../db";
import bcrypt from 'bcrypt'
import z from "zod";


router.post('/register', async (req, res) => {
	try {

		const UserSchema = z.object({
			name: z.string().min(5),
			email: z.email(),
			password: z.string().min(6),
			confirmPassword: z.string()
		}).refine(data => data.password === data.confirmPassword, {
			path: ["confirmPassword"],
			message: 'Passwords do not match'
		})

		const result = UserSchema.safeParse(req.body)
		if (!result.success) {

			let errorsObject: Record<string, string> = {}
			result.error.issues.forEach(issue => {
				const key = issue.path[0] ?? "unknown"
				errorsObject[String(key)] = issue.message
			})
			return res.status(400).json({ errors: errorsObject })
			// errors: result.error.issues.map(issue => {
			// 	return { [String(issue.path[0])]: issue.message }
			// })
		}

		const { name, email, password } = result.data


		const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

		if (existingUser) {
			return res.status(400).json({ error: 'Email already registered.' })
		}


		const hashedPassword = await bcrypt.hash(password, 10)
		const statement = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
		statement.run(name, email, hashedPassword)
		return res.status(201).json({ message: 'User registered successfully.' })
	} catch (err) {
		console.log(err)
	}
})

router.post('/login', (req, res) => {
	res.send('LOGGED IN!')
})
export default router
