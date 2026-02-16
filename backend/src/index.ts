

import express from "express"
import cors from "cors"

const app = express()
app.use(cors({ origin: ['http://localhost:5173'] }))
app.use(express.json())

app.get('/api', (req, res) => {
	res.json({ message: "Hello from Express!" })
})
app.get('/msg', (req, res) => {
	res.json({ msg: "This is coming from the /msg route!" })
})
app.post('/add', (req, res) => {
	const mutated = req.body.lname.split('').map((c: string) => {
		if (c === 'a') {
			return '_'
		} else { return c }
	}).join('')
	res.json({ result: mutated })

})

app.listen(3000, () => console.log("Servidor ejecutandose en http://localhost:3000"))
