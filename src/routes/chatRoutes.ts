import { Router } from "express";
import * as chatController from "../controllers/chatController";

const router = Router();

router.post("/create", chatController.createChat);
router.post("/:chatId/message/send", chatController.sendMessage);
router.get("/:chatId/messages", chatController.getMessages);
router.post("/:chatId/message/:messageId/read", chatController.markMessageRead);
router.post("/:chatId/lastseen", chatController.updateLastSeen);

export default router;
