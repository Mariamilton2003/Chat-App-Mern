import express from "express";
import {googleLogin, Login, Register} from '../controllers/userController';

const router = express.Router();

router.post("/google-login",googleLogin);
router.post("/login",Login);
router.post("/google-login",Register);

export default router;