import connection from "../config/db.js";
import Player from "../models/player.js";
import Team from "../models/team.js";
 

const getAll = async (req,res) => {
    try{
        let players = await Player.findAll({
            attributes: ["idplayer", "name", "last_name", "age"],
           include:{
                model:Team,
                attributes: ["name","idteam"],
                as: "team"
            }
            });
            res.send(players);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while retrieving players."
            });
        }
    };
 

const getById = async (req,res) => {
     try{
          let id =req.params.id;
         let player = await Player.findByPk(id, {
               attributes: ["idplayer", "name", "last_name", "age"],
                include:{
                model:Team,
                  attributes: ["name","idteam"],
                  as: "team"
                }
                });
                if (!player) { // player igua igua a null es un no player
                    res.status(404).send({
                        message: `cannot find payer with id=${id}.`
                    });
                } else {
                    res.send(player);
                }
            }catch (error) {
                res.status(500).send({
                    message: error.message || "some error occurred while retrieving player."
                });
            }
};

const create = async (req,res) => {
    try{
        let name= req.body.name;
        let last_name = req.body.last_name;
        let age =req.body.age;
        let idteam =req.body.idteam;
        let player = await Player.create({"name": name, "last_name":last_name, "age":age, "idteam": idteam});
        res.send(player);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while creating player."
            });
        }
    };

const update = async (req,res) => {
        try{
            let name= req.body.name;
            let last_name = req.body.last_name;
            let age =req.body.age;
            let idteam =req.body.idteam;
            let idplayer=req.params.id
        // 1 opcion
            let player = await Player.update({"name": name, "last_name":last_name, "age":age, "idteam": idteam},{
            where: {
                    idplayer: idplayer
                }
            });
        // 2 opcion 
            /* 
            let player =Player.findByPk(idplayer);
            player.name = name;
            player.last_name = last_name;
            player.age =age;
            player.idteam =idteam;
            player.save();
            */  
            res.send(player);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while updating player."
        });
    }
}

const deletes = async (req,res) => {
    try{
        let idplayer=req.params.id;
        let player = await Player.destroy({
            where: {
                idplayer: idplayer
            }
        });
        console.log(player);
        if(player == 0){
            res.status(404).send({
            message: `Player with id=${idplayer} not found.`
             });
            }
            else {
            res.send("Player deleted");
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error occurred while deleting player."
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
