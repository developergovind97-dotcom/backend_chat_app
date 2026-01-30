import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Chat } from "../entities/Chat";
import { ChatMember } from "../entities/ChatMember";
import dotenv from "dotenv";

dotenv.config();
// db connection
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true, // Auto create tables, good for dev
    logging: false,
    entities: [User, Chat, ChatMember],
    subscribers: [],
    migrations: [],
});
