import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import gameController from "../../controllers/game/gameViewController.js";

const router = Router();

router.get("/", (req,res) => {
    gameController.getAll(req,res);
    //res.send("Mostrar todos los partidos");
});

router.get("/game/:id", (req,res) => {
    gameController.getById(req,res);
   //res.send("Mostrar un partido con id " + req.params.id);
});

router.get("/new", (req,res) => {
    gameController.createForm(req,res);
});
// crear un nuevo equipo
router.post("/", isAuthorized,(req,res) => {
    gameController.create(req,res);
   //res.send("Crear un nuevo partido");
});

// editar un equipo

router.put("/game/update/:id", isAuthorized,(req,res) => {
    gameController.update(req,res);
    //res.send("Modificar un partido con id " + req.params.id);
});

// eliminar un equipo
router.post("/game/delete/:id", isAuthorized,(req,res) => {
    gameController.deletes(req,res);
    //res.send("Eliminar un partido con id " + req.params.id);
});

export default router;
