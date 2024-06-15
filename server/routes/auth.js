import express from "express";
import { login, register, verify } from "../controllers/auth.js";
// import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/:id/verify/:token", verify);

export default router;
