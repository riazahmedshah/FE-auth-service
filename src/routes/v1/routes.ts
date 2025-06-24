import express from "express"
import { createUser, getUser } from "../../controllers/UserController";

export const v1AuthRoutes = express.Router();

v1AuthRoutes.post("/user", createUser);
v1AuthRoutes.get("/userByEmail", getUser);

