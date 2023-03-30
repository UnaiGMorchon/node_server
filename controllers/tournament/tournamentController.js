import Game from "../../models/game.js";
import Tournament from "../../models/tournament.js";

const getAll = async () => {
    try{
        let tournaments = await Tournament.findAll({
            attributes: ["idtournament", "name"],
            include:{
                model:Game,
                attributes: ["idgame", "name", "datetime"],
                as: "games"
            }
            });
            return [0, tournaments];
        } catch (error) {
            return [1, error];
        }
    };
 

const getById = async (id) => {
     try{
                 let tournament = await Tournament.findByPk(id, {
                    attributes: ["idtournament", "name"],
                    include:{
                        model:Game,
                        attributes: ["idgame", "name", "datetime"],
                        as: "game"
                    }
                });
                return [0, tournament];
            }catch (error) {
                return [1, error];
            }
};

const create = async (data) => {
    try{
        let tournament = await Tournament.create(data);
        return [0, tournament];
        } catch (error) {
            return [1, error];
        }
    };

const update = async (data,idtournament) => {
        try{
            let tournament = await Tournament.update(data,{
            where: {
                    idtournament: idtournament
                }
            });
            return [0, tournament];
        } catch (error) {
            return [1, error];
    }
}

const deletes = async (idtournament) => {
    try{
        let tournament = await Tournament.destroy({
            where: {
                idtournament: idtournament
            }
        });
        return [0, tournament];
    } catch (error) {
        return [1, error];

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
