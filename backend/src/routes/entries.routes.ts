import { Router } from "express";
const router = Router()
import { createEntry, deleteEntry, editEntry, getUserEntries } from "../controllers/entries.controller";

router.post('/', createEntry)

router.get('/', getUserEntries)

router.delete('/:id', deleteEntry)

router.put('/:id', editEntry)

export default router
