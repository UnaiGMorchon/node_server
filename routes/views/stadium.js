import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import stadiumController from "../../controllers/stadium/stadiumViewController.js";


const router = Router();

router.get("/", (req,res) => {
    stadiumController.getAll(req,res);
    //res.send("Mostrar todos los estadios");
});

router.get("/stadium/:id", (req,res) => {
    stadiumController.getById(req,res);
    //res.send("Mostrar un estadio con id " + req.params.id);
});

router.get("/new", (req,res) => {
    stadiumController.createForm(req,res);
});

// crear un nuego equipo
router.post("/", isAuthorized,(req,res) => {
    stadiumController.create(req,res);
    //res.send("Crear un nuevo estadio");
});

// editar un equipo

router.put("/stadium/update/:id", isAuthorized,(req,res) => {
    stadiumController.update(req,res);
    //res.send("Modificar un estadio con id " + req.params.id);
});

// eliminar un equipo
router.post("/stadium/delete/:id",isAuthorized, (req,res) => {
    stadiumController.deletes(req,res);
    //res.send("Eliminar un estadio con id " + req.params.id);
});

export default router;
