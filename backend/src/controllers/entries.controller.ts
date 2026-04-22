import { Request, Response } from 'express'
import z from "zod"
import db from "../db"

type EntryType = {
    id: number,
    user_id: number,
    title: string,
    feeling: string,
    content: string,
    created_at: string,
    updated_at: string
}
export const createEntry = (req: Request, res: Response) => {

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
        const { title, feeling, content } = zodResult.data
        const finalTitle = title || 'Untitled'
        const userId = req.session.userId

        const statement = db.prepare('INSERT INTO entries (user_id, title, feeling, content) VALUES (?, ?, ?, ?)')
        statement.run(userId, finalTitle, feeling, content)
        return res.status(201).json({ success: true })
    }

}


export const getUserEntries = (req: Request, res: Response) => {

    const userId = req.session.userId
    if (!userId) {
        return res.status(401).json({ success: false })
    }

    const entries = db.prepare('SELECT id, title, feeling, content, created_at FROM entries WHERE user_id = ? ORDER BY created_at DESC').all(userId)
    return res.status(200).json(entries)
}

export const deleteEntry = (req: Request, res: Response) => {

    const userId = req.session.userId
    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
    }
    const entryId = Number(req.params.id)
    const entry = db.prepare('SELECT * FROM entries WHERE id = ?').get(entryId) as EntryType | undefined
    if (!entry) {
        return res.status(404).json({ success: false, message: 'Not found' })
    }
    if (entry.user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Forbidden' })
    }
    const result = db.prepare('DELETE FROM entries WHERE id = ?').run(entryId)
    if (result.changes > 0) {
        return res.status(200).json({ success: true })
    } else {
        return res.status(404).json({ success: false, message: 'Not found or already deleted.' })
    }
}

export const editEntry = (req: Request, res: Response) => {

    const userId = req.session.userId
    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
    }
    const entryId = Number(req.params.id)
    const entry = db.prepare('SELECT * FROM entries WHERE id = ?').get(entryId) as EntryType | undefined
    if (!entry) {
        return res.status(404).json({ success: false, message: 'Not found' })
    }
    if (entry.user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Forbidden' })
    }

    const entrySchema = z.object({
        title: z.string().trim().max(100, { error: "Too long" }).optional(),
        feeling: z.string().trim().max(50, { error: "Too long" }).optional(),
        content: z.string().trim().max(5000, { error: "Too long" }).min(1, { error: "Write something!" })
    })
    const zodResult = entrySchema.safeParse(req.body)
    if (!zodResult.success) {
        const flattened = z.flattenError(zodResult.error)
        return res.status(422).json({ success: false, errors: flattened })
    }
    const { title, feeling, content } = zodResult.data
    const finalTitle = title || 'Untitled'


    const queryResult = db.prepare(`UPDATE entries SET title = ?, feeling = ?, content = ?, updated_at = datetime('now') WHERE id = ?`).run(finalTitle, feeling, content, entryId)
    if (queryResult.changes === 1) {
        return res.status(200).json({ success: true })
    } else {
        return res.status(404).json({ success: false })
    }

}
