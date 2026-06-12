import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import entryRoutes from "./routes/entries.routes"
import './db'
import session from "express-session"
import dotenv from "dotenv"
import db from "./db"
import SqliteStoreFactory from "better-sqlite3-session-store"
dotenv.config({ quiet: true })

const SqliteStore = SqliteStoreFactory(session)

const app = express()
app.set("trust proxy", 1)
app.use(cors({ origin: ['https://my-daily-journal-miwr.onrender.com'], credentials: true }))
app.use(express.json())
app.use(session({
    store: new SqliteStore({
        client: db,
        expired: {
            clear: true,
            intervalMs: 1000 * 60 * 15
        }
    }),
    secret: process.env.SESSION_SECRET || "some-random-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.get('/api/me', (req, res) => {
    if (req.session.userId) {
        const user = db.prepare('SELECT id, name, email, streak, last_entry_date, longest_streak FROM users WHERE id = ?')
            .get(req.session.userId)
        res.status(200).json({
            success: true,
            user: user
        })

    } else {
        res.status(401).json({ success: false })
    }

})


app.use('/auth', authRoutes)
app.use('/entries', entryRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor ejecutandose en port ${PORT}`))
