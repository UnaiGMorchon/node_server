import Player from "../../models/player.js";
import Team from "../../models/team.js";
import Stadium from "../../models/stadium.js";


const getAll = async (req,res) => {
    try{
        let teams = await Team.findAll({
            attributes: ["idteam", "name", "creation_date"],
           include:[
                        {
                            model:Player,
                            attributes: ["idplayer","name", "last_name", "age", "idteam"],
                            as: "players"
                        },
                        {
                            model:Stadium,
                            attributes: ["idstadium","name", "capacity"],
                            as: "stadium"
                        },
                        {
                            model:Player,
                            attributes: ["idplayer","name", "last_name", "age", "idteam"],
                            as: "captain"
                        },
                       
                    ]
            });
            res.send(teams);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while retrieving players."
            });
        }
    };
 

const getById = async (req,res) => {
     try{
          let id =req.params.id;
         let team = await Team.findByPk(id, {
               attributes: ["idteam", "name", "creation_date"],
                include:[
                    {
                        model:Player,
                        attributes: ["idplayer","name", "last_name", "age", "idteam"],
                        as: "players"
                    },
                    {
                        model:Stadium,
                        attributes: ["idstadium","name", "capacity"],
                        as: "stadium"
                    },
                    {
                        model:Player,
                        attributes: ["idplayer","name", "last_name", "age", "idteam"],
                        as: "captain"
                    },
                ]
                });
                if (!team) { 
                    res.status(404).send({
                        message: `cannot find payer with id=${id}.`
                    });
                } else {
                    res.send(team);
                }
            }catch (error) {
                res.status(500).send({
                    message: error.message || "some error occurred while retrieving team."
                });
            }
};

const create = async (req,res) => {
    try{
        let name= req.body.name;
        let creation_date = req.body.creation_date;
        let idstadium =req.body.idstadium;
        let team = await Team.create({"name": name, "creation_date":creation_date, "idstadium": idstadium});
        res.send(team);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while creating team."
            });
        }
    };

const update = async (req,res) => {
        try{
            let name= req.body.name;
            let creation_date = req.body.creation_date;
            let idteam=req.params.id
            let team = await Team.update({"name": name, "creation_date":creation_date, "idteam": idteam},{
            where: {
                    idteam: idteam
                }
            });
            res.send(team);
        } catch (error) {
            res.status(500).send({
                message: error.message || "some error occurred while updating team."
        });
    }
}

const deletes = async (req,res) => {
    try{
        let idteam=req.params.id;
        let team = await Team.destroy({
            where: {
                idteam: idteam
            }
        });
        console.log(team);
        if(team == 0){
            res.status(404).send({
            message: `Team with id=${idteam} not found.`
             });
            }
            else {
            res.send("Team deleted");
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error occurred while deleting team."
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

const getAll = (req,res) => { // los => igual que funcion getAll
    let sql = "SELECT team.idteam, team.name, team.creation_date, captain.idcaptain, stadium.idstadium\
    FROM team\
    join stadium on stadium.idstadium=team.idstadium\
    join game on game.idgame=stadium.idgame\
    ";
connection.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
});  
};

const getById =(req,res) => {
    let sql = "SELECT team.idteam, team.name, team.creation_date, captain.idcaptain, stadium.idstadium\
    FROM team\
    join stadium on stadium.idstadium=team.idstadium\
    join game on game.idgame=stadium.idgame\
    where idteam = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result); 
    });
};

const create =(req,res) => {
    let name= req.body.name;
    let creation_date = req.body.creation_date;
    let idteam = req.params.id;
    let idstadium =req.body.idstadium;
    let idcaptain= req.body.idcaptain;
    let sql = "insert into team (team.idteam, team.name, team.creation_date, captain.idcaptain, stadium.idstadium)\
    values (?,?,?,?,?)";
    connection.query(sql, [idteam, name, creation_date, idcaptain, idstadium,], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const update =(req,res) => {
    let name= req.body.name;
    let creation_date = req.body.creation_date;
    let idteam = req.params.id;
    let idstadium =req.body.idstadium;
    let idcaptain= req.body.idcaptain;
    let sql = "update team\
    set idteam=?, name=?, creation_date=?, captain=?, idstadium=?\
    where idgame = ?";
    connection.query(sql, [idteam, name, creation_date, idcaptain, idstadium], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const deletes =(req,res) => {
    let idteam = req.params.id;
    let sql = "DELETE FROM team where idteam= ?";
    connection.query(sql, [idgame], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}



*/