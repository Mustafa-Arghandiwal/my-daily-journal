import { Router } from "express";
const router = Router()
import { createEntry, deleteEntry, getUserEntries } from "../controllers/entries.controller";

router.post('/', createEntry)

router.get('/', getUserEntries)

router.delete('/:id', deleteEntry)

export default router
