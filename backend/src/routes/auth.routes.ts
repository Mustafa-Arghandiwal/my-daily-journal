import { Router } from "express"
const router = Router()
import db from "../db";
import bcrypt from 'bcrypt'


router.post('/register', async (req, res) => {
	try {
		const { name, email, password, confirmPassword } = req.body
		if (!name || !email || !password || !confirmPassword) {
			return res.status(400).json({ error: 'All fields are required.' })
		}

		const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
		// console.log(existingUser)//object of user
		if (existingUser) {
			return res.status(400).json({ error: 'Email already registered.' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const statement = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
		statement.run(name, email, hashedPassword)
		return res.status(201).json({
			message: "User registered successfully!"
		})


		res.json({ message: 'registered!' })
	} catch (err) {
		console.log(err)

	}
})

router.post('/login', (req, res) => {
	res.send('LOGGED IN!')
})
export default router
