
import stadiumController from "./stadiumController.js";


const getAll = async (req,res) => {
        let result = await stadiumController.getAll();
        if(result[0] === 0) {
            res.send(result[1]);
        }else {
            let error = result [1];
            res.status(500).send({
                message: error.message || "some error occurred while retrieving stadiums."
            });
        }
    };


const getById = async (req,res) => {
          let id =req.params.id;
         let result = await stadiumController.getById(id); 
         if(result[0] === 0) {
            let stadium = result[1];
            if (!stadium) {
                res.status(404).send({
                    message: `Cannot find stadium with id=${id}.`
                });
            } else {
                res.send(stadium);
            }
        } else {
            let error = result[1];
                res.status(500).send({
                    message: error.message || "some error occurred while retrieving stadium."
                });
            }
};

const create = async (req,res) => {
    let data ={
        name: req.body.name,
        address: req.body.address,
        capacity:req.body.capacity
        }
        let result = await stadiumController.create(data);
        if(result[0] === 0) {
            res.send(result[1]);
        } else {
            let error = result[1];
            res.status(500).send({
                message: error.message || "some error occurred while creating stadium."
            });
        }
    };

const update = async (req,res) => {
     
    let data ={
        name: req.body.name,
        address: req.body.address,
        capacity:req.body.capacity
        }
        let idstadium =req.params.id
            let result = await stadiumController.update(data,idstadium);
            if(result[0] === 0) {
                res.send(result[1]);
            } else {
                let error = result[1];
            res.status(500).send({
                message: error.message || "some error occurred while updating stadium."
        });
    }
}

const deletes = async (req,res) => {
        let idstadium=req.params.id;
        let result = await stadiumController.deletes(idstadium);
        if(result[0] === 0) {
            if(result[1] === 0){
                res.status(404).send({
                message: `Stadium with id=${idstadium} not found.`
                });
            }
            else {
            res.send("Stadium deleted");
            }
        } else {
            let error = result[1];
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
