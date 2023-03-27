import connection from "../config/db.js";

const getAll = (req,res) => { // los => igual que funcion getAll
    let sql = "SELECT player.idplayer, player.name, player.last_name, player.age, team.name as team_name\
    FROM player\
    left join team on player.idteam = team.idteam\
    ";
connection.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
});  
};

const getById =(req,res) => {
    let sql = "SELECT player.idplayer, player.name, player.last_name, player.age, team.name as team_name\
    FROM player\
    left join team on player.idteam = team.idteam\
    where idplayer = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result); 
    });
};

const create =(req,res) => {
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

const update =(req,res) => {
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

const deletes =(req,res) => {
    let idplayer = req.params.id;
    let sql = "DELETE FROM player where idplayer= ?";
    connection.query(sql, [idplayer], (err, result) => {
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
