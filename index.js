import express from "express";
import router from "./routes/router.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/", router); // el ruter estara en la ruta principal sino estarian apartir de ahi

app.listen(3000, () => {
console.log("Server is running on port 3000"); // se ve en el servidor no en la consola del navegador
});











/*
router.get("/", (req,res) => {
    res.send("Hello bilbao");
});

router.get("/users/:name",(req, res) => {
    let name = req.params.name;
    let age = req.query.age;
    console.log(req.query);  // es un console.log dentro del servidor solo sale en servidor
    res.send(`Hello ${name}, your age is ${age}`);
});

router.post("/users", (req, res) => {
    console.log (req.body); // guarda la informacion en body.
    res.send("Hello world");
});

router.get("/bye", (req,res) => {
    res.send("Bye World");
});
*/