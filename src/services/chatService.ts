import { AppDataSource } from "../config/database";
import { Chat } from "../entities/Chat";
import { ChatMember } from "../entities/ChatMember";
import { User } from "../entities/User";
import { In } from "typeorm";

const chatRepository = AppDataSource.getRepository(Chat);
const chatMemberRepository = AppDataSource.getRepository(ChatMember);
const userRepository = AppDataSource.getRepository(User);
// create chats
export const createOrGetChat = async (userAId: number, userBId: number) => {

    const userAChats = await chatMemberRepository.find({ where: { userId: userAId }, relations: ["chat"] });
    const userAChatIds = userAChats.map(cm => cm.chatId);

    if (userAChatIds.length > 0) {
        const existingChatMember = await chatMemberRepository.findOne({
            where: {
                chatId: In(userAChatIds),
                userId: userBId
            },
            relations: ["chat"]
        });

         if (existingChatMember && existingChatMember.chat.type === 'private') {
            return existingChatMember.chatId;
        }
    }

    const newChat = chatRepository.create({ type: 'private' });
    await chatRepository.save(newChat);


    const uA = await userRepository.findOneBy({ id: userAId });
    const uB = await userRepository.findOneBy({ id: userBId });
    
    if (!uA || !uB) throw new Error("User not found");

    const memberA = chatMemberRepository.create({ chatId: newChat.id, userId: userAId });
    const memberB = chatMemberRepository.create({ chatId: newChat.id, userId: userBId });

    await chatMemberRepository.save([memberA, memberB]);

    return newChat.id;
};
// get users chats
export const getUserChats = async (userId: number) => {
    const memberships = await chatMemberRepository.find({
        where: { userId },
        relations: ["chat"]
    });
    
    const results = await Promise.all(memberships.map(async (m) => {
        const members = await chatMemberRepository.find({ where: { chatId: m.chatId } });
        return {
            ...m.chat,
            members: members.map(mem => mem.userId)
        };
    }));

    return results;
};
// user in chats
export const isUserInChat = async (userId: number, chatId: number) => {
    const member = await chatMemberRepository.findOne({ where: { userId, chatId } });
    return !!member;
};
