import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import tournamentController from "../../controllers/tournament/tournamentViewController.js";
 

const router = Router();

router.get("/", (req,res) => {
    tournamentController.getAll(req,res);
    // res.send("Mostrar todos los torneos");
});

router.get("/tournament/:id", (req,res) => {
    tournamentController.getById(req,res);
    // res.send("Mostrar un torneo con id " + req.params.id);
});


router.get("/new", (req,res) => {
    tournamentController.createForm(req,res);
    // res.send("Mostrar un torneo con id " + req.params.id);
});

// crear un nuego equipo
router.post("/", isAuthorized,(req,res) => {
    tournamentController.create(req,res);
    // res.send("Crear un nuevo torneo");
});

// editar un equipo

router.put("/tournament/:id", isAuthorized,(req,res) => {
    tournamentController.update(req,res);
    //res.send("Modificar un torneo con id " + req.params.id);
});

// eliminar un equipo
router.delete("/tournament/:id",isAuthorized,(req,res) => {
    tournamentController.deletes(req,res);
    //res.send("Eliminar un torneo con id " + req.params.id);
});

export default router;
