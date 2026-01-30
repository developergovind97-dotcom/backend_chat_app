import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();
// firebase configg
if (!admin.apps.length) {
    
    try {
        admin.initializeApp({
             credential: admin.credential.applicationDefault() 
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
}

export const db = admin.firestore();
