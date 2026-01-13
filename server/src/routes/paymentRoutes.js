import express from "express";
import { createCheckoutSession } from "../controllers/PaymentController.js";
import { dummyMW } from "../middleware/dummyMW.js";


const router = express.Router();

router.post("/create-checkout",dummyMW, createCheckoutSession);

export default router;
