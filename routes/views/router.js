import { Router } from "express";
import playerRouter from "./player.js";
import teamRouter from "./team.js";
import gameRouter from "./game.js";
import stadiumRouter from "./stadium.js";
import tournamentRouter from "./tournament.js";
//import userRouter from "./user.js";
import authRouter from "./auth.js";
//import isAuthorized from "../../middlewares/auth.js";

const router = Router();

router.use("/players", playerRouter);
//router.use("/users", isAuthorized, userRouter);
router.use("/", authRouter);
router.get("/",(req,res) => {
    const auth = req.user;
    res.render("index",{auth});
});

router.use("/teams", teamRouter);
router.use("/games", gameRouter);
router.use("/stadiums", stadiumRouter);
router.use("/tournaments", tournamentRouter);

export default router;
