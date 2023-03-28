import connection from "../config/db.js";

const getAll = (req,res) => { // los => igual que funcion getAll
    let sql = "SELECT team.idteam, team.name, team.creation_date, idcaptain, stadium.idstadium\
    FROM team\
    join stadium on stadium.idstadium=team.idstadium\
    join game on game.idstadium=stadium.idstadium";
connection.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
});  
};

const getById =(req,res) => {
    let sql = "SELECT team.idteam, team.name, team.creation_date, idcaptain, stadium.idstadium\
    FROM team\
    join stadium on stadium.idstadium=team.idstadium\
    join game on game.idstadium=stadium.idstadium\
    where idteam = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result); 
    });
};

const create =(req,res) => {
    let name= req.body.name;
    let creation_date = req.body.creation_date;
    let idstadium =req.body.idstadium;
    let idcaptain= req.body.idcaptain;
    let idteam = req.params.id;
    let sql = "insert into team (team.name, team.creation_date, idcaptain, stadium.idstadium)\
    values (?,?,?,?)";
    connection.query(sql, [name, creation_date, idcaptain, idstadium,idteam], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const update =(req,res) => {
    let name= req.body.name;
    let creation_date = req.body.creation_date;
    let idstadium =req.body.idstadium;
    let idcaptain= req.body.idcaptain;
    let idteam = req.params.id;
    let sql = "update team\
    set name=?, creation_date=?, idcaptain=?, idstadium=?\
    where idteam = ?";
    connection.query(sql, [ name, creation_date, idcaptain, idstadium, idteam], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const deletes =(req,res) => {
    let idteam = req.params.id;
    let sql = "DELETE FROM team where idteam= ?";
    connection.query(sql, [idteam], (err, result) => {
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