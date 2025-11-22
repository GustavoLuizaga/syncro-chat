import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import passport from "passport";
import routes from "./routes/route";
import bodyParser from "body-parser";
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
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        const puerto = process.env.PORT || 3000;
        
        // middlewares
        app.use(bodyParser.json());
        app.use(passport.initialize());
        
        // static files
        app.use(express.static(path.join(__dirname,"public")));

        // rutas
        app.use("/", routes);
        
        

        // configurar socket.io
        configurarSocketIO(io);
        
        // guardar instancia de io para usar en otros archivos
        const { setIOInstance } = await import("../src/sockets/socket.handler");
        setIOInstance(io);
        
        httpServer.listen(puerto, () => {
            console.log(`Servidor corriendo en el puerto: ${puerto}`);
        });
    } catch (error) {
        console.log("Error al iniciar el servidor:", error);
    }
};

start();
