import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import gameController from "../../controllers/game/gameAPIController.js";

const router = Router();

router.get("/", (req,res) => {
    gameController.getAll(req,res);
    //res.send("Mostrar todos los partidos");
});

router.get("/:id", (req,res) => {
    gameController.getById(req,res);
   //res.send("Mostrar un partido con id " + req.params.id);
});

// crear un nuevo equipo
router.post("/", isAuthorized,(req,res) => {
    gameController.create(req,res);
   //res.send("Crear un nuevo partido");
});

// editar un equipo

router.put("/:id", isAuthorized,(req,res) => {
    gameController.update(req,res);
    //res.send("Modificar un partido con id " + req.params.id);
});

// eliminar un equipo
router.delete("/:id", isAuthorized,(req,res) => {
    gameController.deletes(req,res);
    //res.send("Eliminar un partido con id " + req.params.id);
});

export default router;
