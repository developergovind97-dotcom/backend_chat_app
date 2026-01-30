import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/database";
import chatRoutes from "./routes/chatRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
