import { Router } from "express";
import { getNotes, createNote, getNote, updateNote, deleteNote } from "../controllers/notes";
import {requireAuth} from "../middleware/auth";

const router = Router();



router.use(requireAuth)
router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

//router.get("/", getNotes);

export default router;
