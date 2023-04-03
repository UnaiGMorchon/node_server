import { format } from "mysql2";
import userControler from "../../controllers/user/userControler.js";
import {Router} from "express";

const router = Router ();

router.get("/login", (req, res) => {
    userControler.loginForm(req,res);
}
);

router.post("/login", (req, res) => {
    userControler.login(req,res);
}
);

router.get("/logout", (req, res) => {
    userControler.logout(req,res);
}
);

router.get("/register", (req, res) => {
    userControler.registerForm(req,res);
}
);

router.post("/register", (req, res) => {
    userControler.create(req,res);
}
);


export default router;