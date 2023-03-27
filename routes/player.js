import { Router } from "express";
import isAuthorized from "../middlewares/auth.js";
import playerController from "../controllers/playerController.js";

const router = Router();

router.get("/", (req,res) => {
    playerController.getAll(req,res);
    // res.send("Mostrar todos los jugadores");
});

router.get("/:id", (req,res) => {
    playerController.getById(req,res);
    // res.send("Mostrar un jugador con id " + req.params.id);
});

// crear un nuego jugador
router.post("/", isAuthorized, (req,res) => {
    playerController.create(req,res);
    //res.send("Crear un nuevo jugador");
});

// editar un jugador pull

router.put("/:id", isAuthorized, (req,res) => {
    playerController.update(req,res);
    // res.send("Modificar un jugador con id " + req.params.id);
});

// eliminar un jugador delete
router.delete("/:id", isAuthorized, (req,res) => {
    playerController.deletes(req,res);
    // res.send("Eliminar un jugador con id " + req.params.id);
});
 
export default router;
