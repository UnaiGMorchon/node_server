
import User from "../../models/user.js";
import bcrypt from "bcrypt";


// crear usuario
const create = async(req,res) => {
   try{
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    let data= {
    username:  req.body.username.toLowerCase(),
    password: hashedPassword,
    email: req.body.email,
    role: req.body.role,
    }

    let user = await User.create(data);
    res.send(user);
   } catch (error){
    res.status(500).send({
        message: error.message || "some error occurred while updating user."
    });
   }
}

// login
const login = async (req,res) => {
    const username = req.body.username.toLowerCase();
    let user = await User.findOne({username:username});
    if (!user) {
        res.status(404).send("El usuario no existe");
        return;
    } 
    let password= req.body.password;
        if(await bcrypt.compare(password,user.password)){// user.password del has y el otro sin ecncriptacion
        res.send("Usuario y contraseña correctos");
    }
         else{
        res.status(401).send("Contraseña incorrecta");
    }
}


//login form

const loginForm =async (req,res) => {
res.render("user/login");
}


const getAll  = async (req,res) => {
    try {
const users = await User.find();
res.status(200).json(users);
    } catch (error) {
res.status(404).json({ message: error.message})
    }
}

export default {create,login,loginForm,getAll};