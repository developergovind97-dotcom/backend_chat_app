# Chat Backend Service

A scalable and production-ready chat backend built using Node.js, TypeScript, PostgreSQL, and Firebase Firestore.  
This service supports user management, one-to-one chats, real-time messaging, read receipts, and last-seen tracking.

---

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Relational Database:** PostgreSQL (TypeORM)
  - Used for users and chat metadata
- **Real-time Database:** Firebase Firestore
  - Used for messages, read receipts, and last-seen updates

---

## Environment Requirements

Ensure the following versions are installed:

- **Node.js:** v20.20.0
- **npm:** v10.8.2
- **PostgreSQL:** Latest stable version recommended

---

## Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-folder>

npm install
CREATE DATABASE chat_db;

# Firebase Setup

Create a Firebase project.
Enable Cloud Firestore.
Go to Project Settings → Service Accounts.
Generate a new private key.
Download the JSON file and place it in the project root as:
# 

serviceAccountKey.json

Create a .env file in the root directory:

DATABASE_URL=postgres://username:password@localhost:5432/chat_db
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
PORT=3002

# Production
npm run build
npm start


# Create User
POST /user/create

{
  "username": "string",
  "email": "string"
}

# List User Chats
GET /user/:userId/chats

# Create or Get 1:1 Chat
POST /chat/create

{
  "userAId": 1,
  "userBId": 2
}


Response:

{
  "chatId": 10
}


# Send Message
POST /chat/:chatId/message/send

{
  "senderId": 1,
  "text": "Hello!"
}


# Get Messages
GET /chat/:chatId/messages?limit=50

# Mark Message as Read
POST /chat/:chatId/message/:messageId/read
{
  "userId": 2
}


# Update Last Seen
POST /chat/:chatId/lastseen

{
  "userId": 2,
  "messageId": "firestore_message_id"
}


# Project Structure
src/
├── config/          # Database & Firebase configuration
├── controllers/    # API controllers
├── entities/       # TypeORM entities
├── routes/         # Express routes
├── services/       # Business logic & Firestore integration
└── index.ts        # Application entry point
