import express from "express";
import { UserController } from "../controller/userController";

const router = express.Router();

router.post("/register", UserController.userRegistration);

export default router;
