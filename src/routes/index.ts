import express from "express"
import { v1AuthRoutes } from "./v1/routes";

export const router = express.Router();

router.use("/v1", v1AuthRoutes);