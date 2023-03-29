
 import playerController from "./playerController.js";

const getAll = async (req,res) => {
    let result = await playerController.getAll();
    if(result[0] === 0) {
        res.send(result[1]);
    }else {
        let error = result [1];
        res.status(500).send({
            message: error.message || "some error occurred while retrieving players."
        });
    }
};
 

const getById = async (req,res) => {
    let id= req.params.id;
    let result = await playerController.getById(id);
            if(result[0] === 0) {
                let player = result[1];
                if (!player) {
                    res.status(404).send({
                        message: `Cannot find player with id=${id}.`
                    });
                } else {
                    res.send(player);
                }
            } else {
                let error = result[1];
                res.status(500).send({
                    message: error.message || "some error occurred while retrieving player."
                });
            }
};

const create = async (req,res) => {
        let data ={
            name: req.body.name,
            last_name: req.body.last_name,
            age: req.body.age,
            idteam: req.body.idteam
        }
    
        let result = await playerController.create(data);

        if(result[0] === 0) {
            res.send(result[1]);
        } else {
            let error = result[1];
            res.status(500).send({
                message: error.message || "some error occurred while creating player."
            });
     }
};

const update = async (req,res) => {
            let data = {
            name: req.body.name,
            last_name: req.body.last_name,
            age:req.body.age,
            idteam: req.body.idteam
            }
            let idplayer=req.params.id
        // 1 opcion
            let player = await playerController.update(data,idplayer);
            if(result[0] === 0) {
                res.send(result[1]);
            } else {
                let error = result[1];
                res.status(500).send({
                message: error.message || "some error occurred while updating player."
        });
    }
} 

const deletes = async (req,res) => {
        let idplayer = req.params.id;
        let result = await playerController.deletes(idplayer);
        if(result[0] === 0) {
            if(result[1] === 0){
                res.status(404).send({
                message: `Player with id=${idplayer} not found.`
                });
            }
            else {
            res.send("Player deleted");
            }
        } else {
            let error = result[1];
            res.status(500).send({
                message: error.message || "some error occurred while updating player."
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