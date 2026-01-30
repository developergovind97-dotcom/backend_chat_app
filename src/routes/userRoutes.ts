import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.get("/:userId/chats", userController.getUserChats);
router.post("/create", userController.createUser); 

export default router;
