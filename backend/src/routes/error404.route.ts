import {Router} from "express";
const router = Router();
//al no poner la ubicacion estamos diciendo que cualquier ruta que no tengamos le decimos ruta no encontrada
router.use((req,res)=>{
    res.status(404).send("Error 404: Ruta no encontrada");
});

export default router;
