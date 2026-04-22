import { Router } from "express";
const router = Router()
import { createEntry, deleteEntry, editEntry, getUserEntries } from "../controllers/entries.controller";

router.post('/', createEntry)

router.get('/', getUserEntries)

router.delete('/:id', deleteEntry)

router.patch('/:id', editEntry)

export default router
