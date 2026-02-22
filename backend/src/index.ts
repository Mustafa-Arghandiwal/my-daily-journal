

import express from "express"
import cors from "cors"
import router from "./routes/auth.routes"
import './db'

const app = express()
app.use(cors({ origin: ['http://localhost:5173'] }))
app.use(express.json())



app.get('/msg', (req, res) => res.json({ msg: "hi there from /msg route!" }))
app.use('/auth', router)


app.listen(3000, () => console.log("Servidor ejecutandose en http://localhost:3000"))
