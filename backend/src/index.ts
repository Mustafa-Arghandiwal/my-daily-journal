

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
        maxAge: 1000 * 60 * 60 * 24
        // maxAge: 1000 * 10
    }
}))



app.use('/auth', router)

app.get('/api/me', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({
            success: true,
            user: {
                name: 'Mustafa'
            }
        })

    } else {
        res.status(401).json({ success: false, msg: 'unauthorized' })
    }

})


app.listen(3000, () => console.log("Servidor ejecutandose en http://localhost:3000"))
