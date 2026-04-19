

import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import entryRoutes from "./routes/entries.routes"
import './db'
import session from "express-session"
import dotenv from "dotenv"
import db from "./db"
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
        maxAge: 1000 * 60 * 60 * 24
        // maxAge: 1000 * 10
    }
}))



app.use('/auth', authRoutes)
app.use('/entries', entryRoutes)

app.get('/api/me', (req, res) => {
    if (req.session.userId) {
        const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?')
            .get(req.session.userId)
        res.status(200).json({
            success: true,
            user: user
        })

    } else {
        res.status(401).json({ success: false })
    }

})


app.listen(3000, () => console.log("Servidor ejecutandose en http://localhost:3000"))
