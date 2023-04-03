import { Router } from "express";
import isAuthorized from "../../middlewares/auth.js";
import playerController from "../../controllers/player/playerViewController.js";


const router = Router();

router.get("/", (req,res) => {
    playerController.getAll(req,res);
    // res.send("Mostrar todos los jugadores");
});

router.get("/player/:id", (req,res) => {
    playerController.getById(req,res);
    // res.send("Mostrar un jugador con id " + req.params.id);
});

router.get("/new", (req,res) => {
    playerController.createForm(req,res);
});

// crear un nuego jugador
router.post("/", isAuthorized, (req,res) => {
    playerController.create(req,res);
    //res.send("Crear un nuevo jugador");
});

// editar un jugador pull

router.get("/edit/:id",(req,res) => {
    playerController.updateForm(req,res);
    // res.send("Modificar un jugador con id " + req.params.id);
});

router.post("/edit/:id",(req,res) => {
    playerController.update(req,res);
    // res.send("Modificar un jugador con id " + req.params.id);
});

// eliminar un jugador delete
router.post("/delete/:id", isAuthorized, (req,res) => {
    playerController.deletes(req,res);
    // res.send("Eliminar un jugador con id " + req.params.id);
});
 
export default router;
