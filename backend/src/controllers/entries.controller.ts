import { Request, Response } from 'express'
import z from "zod"
import db from "../db"

export const createEntry = async (req: Request, res: Response) => {

    if (!req.session.userId) {
        return res.status(401).json({ success: false })
    }
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
        const title = zodResult.data.title || "Untitled"
        const feeling = zodResult.data.feeling
        const content = zodResult.data.content
        const userId = req.session.userId

        const statement = db.prepare('INSERT INTO entries (user_id, title, feeling, content) VALUES (?, ?, ?, ?)')
        statement.run(userId, title, feeling, content)
        return res.status(201).json({ success: true })
    }

}


export const getUserEntries = async (req: Request, res: Response) => {

    const userId = req.session.userId
    if (!userId) {
        return res.status(401).json({ success: false })
    }

    const entries = db.prepare('SELECT id, title, feeling, content, created_at FROM entries WHERE user_id = ? ORDER BY created_at DESC').all(userId)
    res.status(200).json(entries)
}
