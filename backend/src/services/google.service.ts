import prisma from "../db/prisma";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/auth.interface";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "holaMundo2025";

export const googleLogin = async (accessToken: string, refreshToken: string, profile: any) => {
    try {
        const email = profile.emails[0].value;
        const username = profile.displayName;
        //buscamos al usuario por el email ya que es unico para cada usuario
        let user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        
        // Verifico si el usuario no existe
        if (!user) {
            user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: null  // usuarios de google no tienen contraseña
                }
            });
            console.log("Usuario creado con Google:", user.email);
        } else {
            console.log("Usuario existente inició sesión con Google:", user.email);
        }
        
        return user;
    } catch (error) {
        console.log(`Error en googleLogin: ${error}`);
        throw new Error("Error al autenticar con Google");
    }
};

// generamos el token JWT despues de autenticacion con Google
export const generarTokenGoogle = (user: any) => {
    const payload: TokenPayload = {
        id: user.id,
        username: user.username,
        email: user.email
    };
    
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: "1h"
    });
    
    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        },
        token: token
    };
};
