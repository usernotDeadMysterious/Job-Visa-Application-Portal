import express from "express";
import { signup,login } from "../controllers/NewAUthController.js";
import { signupValidation,loginValidation } from "../middleware/newAuthValidation.js";
const router = express.Router();

router.post('/login', loginValidation, login)

router.post('/signup',signupValidation, signup);

export const newAuthRouter = router;