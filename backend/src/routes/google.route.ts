import { Router } from "express";
import passport from "passport";
import { googleCallbackController } from "../controllers/google.controller";

const router = Router();

// ruta para iniciar autenticacion con Google
router.get("/google", 
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// callback de Google OAuth
router.get("/google/callback", 
    passport.authenticate("google", { 
        session: false,
        failureRedirect: "/index.html"
    }),
    googleCallbackController
);

export default router;
