import { db } from "../config/firebase";
import * as admin from "firebase-admin";

export const sendMessageToFirestore = async (chatId: number, senderId: number, text: string) => {

    const messageRef = db.collection('chats').doc(chatId.toString()).collection('messages').doc();
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    await messageRef.set({
        senderId,
        text,
        timestamp,
        readBy: [] 
    });
    
    return messageRef.id;
};
// get messagesss
export const getMessagesFromFirestore = async (chatId: number, limit: number = 50) => {
    const snapshot = await db.collection('chats').doc(chatId.toString())
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// for mark message read
export const markMessageReadInFirestore = async (chatId: number, messageId: string, userId: number) => {
    const messageRef = db.collection('chats').doc(chatId.toString()).collection('messages').doc(messageId);
    
    await messageRef.update({
        readBy: admin.firestore.FieldValue.arrayUnion(userId)
    });
};

// for update seen
export const updateLastSeenInFirestore = async (chatId: number, userId: number, messageId: string) => {

    const lastSeenRef = db.collection('chats').doc(chatId.toString()).collection('lastSeen').doc(userId.toString());
    
    await lastSeenRef.set({
        messageId,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
};
