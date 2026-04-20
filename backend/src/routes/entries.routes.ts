import { Router } from "express";
const router = Router()
import { createEntry } from "../controllers/entries.controller";

router.post('/', createEntry)

export default router
