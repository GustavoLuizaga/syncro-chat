import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import passport from "passport";
import routes from "./routes/route";
import bodyParser from "body-parser";
import cors from "cors";
import "./config/passport.config";
import { configurarSocketIO } from "../src/sockets/socket.handler";
import path from "path";

dotenv.config();

const start = async () => {
    try {
        const app = express();
        const httpServer = createServer(app);
        const io = new Server(httpServer, {
            cors: {
                origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        const puerto = process.env.PORT || 3000;
        
        // middlewares
        app.use(cors({
            origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
        app.use(bodyParser.json());
        app.use(passport.initialize());

        // rutas
        app.use("/", routes);
        
        

        // configurar socket.io
        configurarSocketIO(io);
        
        // guardar instancia de io para usar en otros archivos
        const { setIOInstance } = await import("../src/sockets/socket.handler");
        setIOInstance(io);
        
        httpServer.listen(puerto, () => {
            console.log(`Servidor corriendo en el puerto: ${puerto}`);
            console.log(`🔗 URL: http://localhost:${puerto}`);
        });
    } catch (error) {
        console.log("Error al iniciar el servidor:", error);
    }
};

start();
