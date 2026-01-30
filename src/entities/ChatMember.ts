import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@Entity()
export class ChatMember {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    chatId!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => Chat, (chat) => chat.members)
    chat!: Chat;

    @ManyToOne(() => User)
    user!: User;
}
