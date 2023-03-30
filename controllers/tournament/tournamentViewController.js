import Game from "../../models/game.js";
import Tournament from "../../models/tournament.js";
 import tournamentController from "./tournamentController.js";


const getAll = async (req,res) => {
        let result = await tournamentController.getAll()
            if(result[0] === 0) {
         res.render("tournament/list",{tournaments: result[1]});
    }else {
        let error = result [1];
            res.status(500).send({
                message: error.message || "some error occurred while retrieving tournaments."
            });
        }
    };
 

const getById = async (req,res) => {
          let id =req.params.id;
         let result = await tournamentController.getById(id);
                  if(result[0] === 0) {
                let tournament = result[1];
                if (!tournament) {
                    res.status(404).send({
                        message: `Cannot find tournament with id=${id}.`
                    });
                } else {
                    res.send(tournament);
                }
            } else {
                let error = result[1];
                res.status(500).send({
                    message: error.message || "some error occurred while retrieving tournament."
                });
            }
};



const createForm = async (req,res) => {
let results = await tournamentController.getAll();
let error = req.query.error;
if(results[0] === 1 || results[1] === []) {
    res.render("tournament/new",{error:error});
        }
        else {
            let tournaments = results[1];
            res.render("tournament/new", {tournament:tournaments,error:error});
    }
}



const create = async (req,res) => {
    let data ={
        name: req.body.name === "" ? null : req.body.name,
    }
        let result = await tournamentController.create(data);
         if(result[0] === 0) {
         res.redirect("/tournaments");
        } else {
            let error = result[1];
            let errorUri = encodeURIComponent(error.message);
            res.redirect(`/tournaments/new?error=${errorUri}`);
        }
    };

const update = async (req,res) => {
     let data ={
        name: req.body.name,
    }
            let idtournament=req.params.id

            let result = await tournamentController.update(data,idtournament);
            if(result[0] === 0) {
                res.send(result[1]);
            } else {
                let error = result[1];
            res.status(500).send({
                message: error.message || "some error occurred while updating tournament."
        });
    }
}

const deletes = async (req,res) => {
        let idtournament=req.params.id;
        let result = await tournamentController.deletes(idtournament);
        res.redirect("/tournaments"); 
}
export default {
    getAll,
    getById,
    createForm,
    create,
    update,
    deletes
}






/* 
const getAll_old = (req,res) => { // los => igual que funcion getAll
    let sql = "SELECT player.idplayer, player.name, player.last_name, player.age, team.name as team_name\
    FROM player\
    left join team on player.idteam = team.idteam\
    ";
connection.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
});  
};

const getById_old =(req,res) => {
    let sql = "SELECT player.idplayer, player.name, player.last_name, player.age, team.name as team_name\
    FROM player\
    left join team on player.idteam = team.idteam\
    where idplayer = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result); 
    });
};
 

const create_old =(req,res) => {
    let name= req.body.name;
    let last_name = req.body.last_name;
    let age =req.body.age;
    let idteam =req.body.idteam;
    let sql = "insert into player (name,last_name,age,idteam)\
    values (?,?,?,?)";
    connection.query(sql, [name,last_name,age,idteam], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}
*//* 
const update_old =(req,res) => {
    let name= req.body.name;
    let last_name = req.body.last_name;
    let age =req.body.age;
    let idteam =req.body.idteam;
    let idplayer = req.params.id;
    let sql = "update player\
    set name=?, last_name=?, age=?, idteam=?\
    where idplayer = ?";
    connection.query(sql, [name,last_name,age,idteam,idplayer], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const deletes_old =(req,res) => {
    let idplayer = req.params.id;
    let sql = "DELETE FROM player where idplayer= ?";
    connection.query(sql, [idplayer], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}
 */
