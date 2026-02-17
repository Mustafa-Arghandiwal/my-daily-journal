import express from "express";
import { Router } from "express"
const router = Router()


router.post('/register', (req, res) => {
	res.send('REGISTERED!')
})

router.post('/login', (req, res) => {
	res.send('LOGGED IN!')
})
export default router
