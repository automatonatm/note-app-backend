import {Router} from "express";
import notesRoutes from './notes'
import authUserRoutes from './user'


const router = Router();

router.use('/notes', notesRoutes)
router.use('/auth', authUserRoutes)

export default router;

