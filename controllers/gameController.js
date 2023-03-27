import connection from "../config/db.js";

const getAll = (req,res) => { // los => igual que funcion getAll
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
