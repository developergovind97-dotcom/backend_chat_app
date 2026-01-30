import { Request, Response } from "express";
import * as chatService from "../services/chatService";
import * as firebaseService from "../services/firebaseService";

export const createChat = async (req: Request, res: Response) => {
    try {
        const { userAId, userBId } = req.body;
        if (!userAId || !userBId) {
            return res.status(400).json({ error: "Missing user IDs" });
        }
        const chatId = await chatService.createOrGetChat(userAId, userBId);
        return res.json({ chatId });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const chatId = parseInt(req.params.chatId as string);
        const { senderId, text } = req.body;
        
        const isMember = await chatService.isUserInChat(senderId, chatId);
        if (!isMember) {
            return res.status(403).json({ error: "User is not in this chat" });
        }
        
        const messageId = await firebaseService.sendMessageToFirestore(chatId, senderId, text);
        return res.json({ messageId });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const chatId = parseInt(req.params.chatId as string);
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
        
        const messages = await firebaseService.getMessagesFromFirestore(chatId, limit);
        return res.json(messages);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const markMessageRead = async (req: Request, res: Response) => {
    try {
        const chatId = parseInt(req.params.chatId as string);
        const messageId = req.params.messageId as string;
        const { userId } = req.body;

        await firebaseService.markMessageReadInFirestore(chatId, messageId, userId);
        return res.json({ success: true });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateLastSeen = async (req: Request, res: Response) => {
    try {
        const chatId = parseInt(req.params.chatId as string);
        const { userId, messageId } = req.body;

        await firebaseService.updateLastSeenInFirestore(chatId, userId, messageId);
        return res.json({ success: true });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
