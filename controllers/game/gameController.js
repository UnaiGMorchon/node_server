
import Stadium from "../../models/stadium.js";
import Game from "../../models/game.js";


const getAll = async (req,res) => {
    try{
        let games = await Game.findAll({
            attributes: ["idgame", "name", "datetime"],
            include:{
                model:Stadium,
                attributes: ["idstadium", "name", "address", "capacity"],
                as: "stadium"
            }
            });
            res.send(games);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while retrieving games."
            });
        }
    };
 

const getById = async (req,res) => {
     try{
          let id =req.params.id;
         let game = await Game.findByPk(id, {
               attributes: ["idgame", "name", "datetime"],
                include:{
                    model:Stadium,
                    attributes: ["idstadium", "name", "address", "capacity"],
                    as: "stadium"
                }
                });
                if (!game) { // player igua igua a null es un no player
                    res.status(404).send({
                        message: `cannot find game with id=${id}.`
                    });
                } else {
                    res.send(game);
                }
            }catch (error) {
                res.status(500).send({
                    message: error.message || "some error occurred while retrieving game."
                });
            }
};

const create = async (req,res) => {
    try{
        let name= req.body.name;
        let datetime = req.body.datetime;
        let idstadium =req.body.idstadium;
        let game = await Game.create({"name": name, "datetime":datetime, "idstadium": idstadium});
        res.send(game);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while creating game."
            });
        }
    };

const update = async (req,res) => {
        try{
            let name= req.body.name;
            let datetime = req.body.datetime;
            let idgame =req.body.idgame;
            let game = await Game.update({"name": name, "datetime":datetime, "idgame": idgame},{
            where: {
                    idgame: idgame
                }
            }); 
            res.send(game);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while updating game."
        });
    }
}

const deletes = async (req,res) => {
    try{
        let idgame=req.params.id;
        let game = await Game.destroy({
            where: {
                idgame: idgame
            }
        });
        console.log(game);
        if(player == 0){
            res.status(404).send({
            message: `Game with id=${idgame} not found.`
             });
            }
            else {
            res.send("game deleted");
        }
    } catch (error) {
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