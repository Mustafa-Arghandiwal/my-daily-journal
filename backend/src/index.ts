

import express from "express"
import cors from "cors"
import router from "./routes/auth.routes"
import './db'
import session from "express-session"
import dotenv from "dotenv"
dotenv.config({ quiet: true })

const app = express()
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(express.json())
app.use(session({
	secret: process.env.SESSION_SECRET || "some-random-secret",
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 60
	}
}))



app.use('/auth', router)


app.listen(3000, () => console.log("Servidor ejecutandose en http://localhost:3000"))
