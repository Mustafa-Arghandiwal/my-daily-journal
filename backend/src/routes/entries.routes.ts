import { Router } from "express";
const router = Router()
import { createEntry, getUserEntries } from "../controllers/entries.controller";

router.post('/', createEntry)

router.get('/', getUserEntries)

export default router
