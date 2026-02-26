import express from "express";
import { Router } from "express"
const router = Router()
import db from "../db";


router.post('/register', (req, res) => {
	try {
		const { name, email, password, confirmPassword } = req.body
		if (!name || !email || !password || !confirmPassword) {
			return res.status(400).json({ error: 'All fields are required.' })
		}

		const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
		console.log(existingUser)
		if (existingUser) {
			return res.status(400).json({ error: 'Email already registered.' })
		}



		res.json({ message: 'registered!' })
	} catch (err) {
		console.log(err)

	}
})

router.post('/login', (req, res) => {
	res.send('LOGGED IN!')
})
export default router
