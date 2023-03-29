import Team from "../../models/team.js";
import Stadium from "../../models/stadium.js";
import Game from "../../models/game.js";

const getAll = async (req,res) => {
    try{
        let stadiums = await Stadium.findAll({
            attributes: ["idstadium", "name", "address", "capacity"],
           include:{
                model:Game,
                attributes: ["name","idteam", "datetime", "idstadium", "idtournament"],
                as: "game"
            }
            });
            res.send(stadiums);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while retrieving stadiums."
            });
        }
    };


const getById = async (req,res) => {
     try{
          let id =req.params.id;
         let stadium = await Stadium.findByPk(id, {
               attributes: ["idstadium", "name", "address", "capacity"],
                include:{
                    model:Game,
                    attributes: ["name","idteam", "datetime", "idstadium", "idtournament"],
                    as: "game"
                }
                });
                if (!stadium) {
                    res.status(404).send({
                        message: `cannot find stadium with id=${id}.`
                    });
                } else {
                    res.send(stadium);
                }
            }catch (error) {
                res.status(500).send({
                    message: error.message || "some error occurred while retrieving stadium."
                });
            }
};

const create = async (req,res) => {
    try{
        let name= req.body.name;
        let address = req.body.address;
        let idstadium =req.body.idstadium;
        let stadium = await Stadium.create({"name": name, "address":address, "idstadium": idstadium});
        res.send(stadium);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while creating stadium."
            });
        }
    };

const update = async (req,res) => {
        try{
            let name= req.body.name;
            let address = req.body.address;
            let idstadium =req.body.idstadium;
            let idteam=req.params.id
            let stadium = await Stadium.update({"name": name, "address":address, "idstadium": idstadium, "idteam": idteam},{
            where: {
                    idstadium: idstadium
                }
            });
            res.send(stadium);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while updating stadium."
        });
    }
}

const deletes = async (req,res) => {
    try{
        let idstadium=req.params.id;
        let stadium = await Stadium.destroy({
            where: {
                idstadium: idstadium
            }
        });
        console.log(stadium);
        if(stadium == 0){
            res.status(404).send({
            message: `Stadium with id=${idstadium} not found.`
             });
            }
            else {
            res.send("Stadium deleted");
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error occurred while deleting stadium."
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
