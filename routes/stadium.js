import { Router } from "express";
import isAuthorized from "../middlewares/auth.js";

const router = Router();

router.get("/", (req,res) => {
    res.send("Mostrar todos los estadios");
});

router.get("/:id", (req,res) => {
    res.send("Mostrar un estadio con id " + req.params.id);
});

// crear un nuego equipo
router.post("/", isAuthorized,(req,res) => {
    res.send("Crear un nuevo estadio");
});

// editar un equipo

router.put("/:id", isAuthorized,(req,res) => {
    res.send("Modificar un estadio con id " + req.params.id);
});

// eliminar un equipo
router.delete("/:id",isAuthorized, (req,res) => {
    res.send("Eliminar un estadio con id " + req.params.id);
});

export default router;
