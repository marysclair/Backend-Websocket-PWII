import express from "express";
import { orderRouter } from "./OrderRouter";

export const router = express.Router();

router.use("/order", orderRouter);
