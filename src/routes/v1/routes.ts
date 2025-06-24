import express from "express"
import { createUser } from "../../controllers/UserController";

export const v1AuthRoutes = express.Router();

v1AuthRoutes.post("/user", createUser);

