import express from "express";
import { handleWebhook } from "../controllers/webhookController.js";

export const userRouter = express.Router();

userRouter.post("/webhook", handleWebhook);
