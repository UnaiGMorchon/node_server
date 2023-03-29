
import Stadium from "../../models/stadium.js";
import Game from "../../models/game.js";
import gameController from "./gameController.js";


const getAll = async (req,res) => {
        let result = await gameController.getAll();
        if(result[0] === 0) {
            res.send(result[1]);
        }else {
            let error = result [1];
            res.status(500).send({
                message: error.message || "some error occurred while retrieving games."
            });
        }
    };
 

const getById = async (req,res) => {
          let id =req.params.id;
         let result = await gameController.getById(id);
         if(result[0] === 0) {
            let game = result[1];
            if (!game) {
                res.status(404).send({
                    message: `Cannot find game with id=${id}.`
                });
            } else {
                res.send(game);
            }
        } else {
            let error = result[1];
                res.status(500).send({
                    message: error.message || "some error occurred while retrieving game."
                });
            }
};

const create = async (req,res) => {
  let data ={
        name:req.body.name,
        datetime:req.body.datetime,
        idstadium: req.body.idstadium
        }
        let result = await gameController.create(data);
        if(result[0] === 0) {
            res.send(result[1]);
        } else {
            let error = result[1];
            res.status(500).send({
                message: error.message || "some error occurred while creating game."
            });
        }
    };

const update = async (req,res) => {
    let data ={
        name:req.body.name,
        datetime:req.body.datetime,
        idstadium: req.body.idstadium
        }
        let idgame= req.params.id

            let result = await gameController.update(data, idgame);
            if(result[0] === 0) {
                res.send(result[1]);
            } else {
                let error = result[1];
            res.status(500).send({
                message: error.message || "some error occurred while updating game."
        });
    }
}

const deletes = async (req,res) => {
        let idgame=req.params.id;
        let result = await gameController.deletes(idgame);
        if(result[0] === 0) {
            if(result[1] === 0){
                res.status(404).send({
                message: `Game with id=${idgame} not found.`
                });
            }
            else {
            res.send("Game deleted");
            }
        } else {
            let error = result[1];
        res.status(500).send({
            message: error.message || "some error occurred while deleting game."
        });
    }  
}
export default {
    getAll,
    getById,
    create,
    update,
    deletes
}




















/* const getAll = (req,res) => { // los => igual que funcion getAll
    let sql = "SELECT game.idgame, game.name, game.datetime,stadium.idstadium,tournament.idtournament\
    FROM stadium\
    join game on stadium.idstadium=game.idstadium\
    join tournament on game.idtournament=tournament.idtournament\
    ";
connection.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
});  
};

const getById =(req,res) => {
    let sql = "SELECT game.idgame, game.name, game.datetime,stadium.idstadium,tournament.idtournament\
    FROM stadium\
    join game on stadium.idstadium=game.idstadium\
    join tournament on game.idtournament=tournament.idtournament\
    where idgame = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result); 
    });
};

const create =(req,res) => {
    let name= req.body.name;
    let datetime = req.body.datetime;
    let idgame = req.params.id;
    let idstadium =req.body.idstadium;
    let idtournament =req.body.idtournament;
    let sql = "insert into game (name,datetime,idgame,idstadium, idtournament)\
    values (?,?,?,?,?)";
    connection.query(sql, [name,datetime,idgame, idstadium, idtournament], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const update =(req,res) => {
    let name= req.body.name;
    let datetime = req.body.datetime;
    let idstadium =req.body.idstadium;
    let idtournament =req.body.idtournament;
    let idgame = req.params.id;
    let sql = "update game\
    set name=?, datetime=?, idgame=?, idstadium=?, idtournament=?\
    where idgame = ?";
    connection.query(sql, [name,datetime,idgame, idstadium, idtournament], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const deletes =(req,res) => {
    let idgame = req.params.id;
    let sql = "DELETE FROM game where idgame= ?";
    connection.query(sql, [idgame], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

export default {
    getAll,
    getById,
    create,
    update,
    deletes
}
 */