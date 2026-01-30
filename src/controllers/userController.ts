import { Request, Response } from "express";
import * as chatService from "../services/chatService";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);
// get userss chats
export const getUserChats = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId as string);
        const chats = await chatService.getUserChats(userId);
        return res.json(chats);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
// create users
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        const user = userRepository.create({ username, email });
        await userRepository.save(user);
        return res.json(user);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
