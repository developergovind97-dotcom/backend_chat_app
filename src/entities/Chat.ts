import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { ChatMember } from "./ChatMember";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: "private" }) 
    type!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => ChatMember, (chatMember) => chatMember.chat)
    members!: ChatMember[];
}
