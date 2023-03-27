import { Router } from "express";
import isAuthorized from "../middlewares/auth.js";

const router = Router();

router.get("/", (req,res) => {
    res.send("Mostrar todos los torneos");
});

router.get("/:id", (req,res) => {
    res.send("Mostrar un torneo con id " + req.params.id);
});

// crear un nuego equipo
router.post("/", isAuthorized,(req,res) => {
    res.send("Crear un nuevo torneo");
});

// editar un equipo

router.put("/:id", isAuthorized,(req,res) => {
    res.send("Modificar un torneo con id " + req.params.id);
});

// eliminar un equipo
router.delete("/:id",isAuthorized,(req,res) => {
    res.send("Eliminar un torneo con id " + req.params.id);
});

export default router;
