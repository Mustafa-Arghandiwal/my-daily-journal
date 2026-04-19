import { Router } from "express";
const router = Router()
import db from "../db";
import z, { success } from "zod";


router.post('/', (req, res) => {
    // if (!req.session.userId) {
    //     return res.status(401).json({ success: false })
    // }
    const entrySchema = z.object({
        title: z.string().trim().max(100, { error: "Too long" }).optional(),
        feeling: z.string().trim().max(50, { error: "Too long" }).optional(),
        content: z.string().trim().max(5000, { error: "Too long" }).min(1, { error: "Write something!" })
    })
    const zodResult = entrySchema.safeParse(req.body)
    if (!zodResult.success) {
        const flattened = z.flattenError(zodResult.error)
        return res.status(400).json({ success: false, errors: flattened })
    } else {
        console.log(zodResult.data)
        const title = zodResult.data.title || "Untitled"
        const feeling = zodResult.data.feeling
        const content = zodResult.data.content
        const userId = req.session.userId
        console.log(userId)

        const statement = db.prepare('INSERT INTO entries (user_id, title, feeling, content) VALUES (?, ?, ?, ?)')
        statement.run(userId, title, feeling, content)
        return res.status(201).json({ success: true })
    }

})

export default router
