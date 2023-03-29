import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import teamController from "../../controllers/team/teamViewController.js";

const router = Router();

router.get("/", (req,res) => {
    teamController.getAll(req,res);
    // res.send("Mostrar todos los equipos");
});

router.get("/team/:id", (req,res) => {
    teamController.getById(req,res);
    //res.send("Mostrar un equipo con id " + req.params.id);
});

router.get("/new", (req,res) => {
    teamController.createForm(req,res);
});

// crear un nuego equipo
router.post("/", isAuthorized,(req,res) => {
    teamController.create(req,res);
//res.send("Crear un nuevo equipo");
});

// editar un equipo

router.put("/team/:id", isAuthorized, (req,res) => {
    teamController.update(req,res);
    //res.send("Modificar un equipo con id " + req.params.id);
});

// eliminar un equipo
router.delete("/team/:id", isAuthorized,(req,res) => {
    teamController.deletes(req,res);
   //res.send("Eliminar un equipo con id " + req.params.id);
});

export default router;
