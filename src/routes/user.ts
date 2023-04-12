import { Router } from "express";
import { signUp, login, getAuthenticatedUser, logout } from "../controllers/user";
import {requireAuth} from "../middleware/auth";

const router = Router();

router.route("/signup").post(signUp);

router.route("/login").post(login);

router.route("/me").get(requireAuth, getAuthenticatedUser);

router.route("/logout").post(logout);


export default router;
