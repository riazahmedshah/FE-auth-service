import express from "express"
import { createUser, getUser, signIn } from "../../controllers/UserController";

export const v1AuthRoutes = express.Router();


v1AuthRoutes.post("/user",createUser);
v1AuthRoutes.post("/signin", signIn);
v1AuthRoutes.get("/userByEmail", getUser);

