import connection from "../config/db.js";

const getAll = (req,res) => { // los => igual que funcion getAll
    let sql = "SELECT tournament.idtournament, tournament.name\
    FROM tournament\
    left join game on game.idtournament = tournament.idtournament\
    ";
connection.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
});  
};

const getById =(req,res) => {
    let sql = "SELECT tournament.idtournament, tournament.name\
    FROM tournament\
    left join game on game.idtournament = tournament.idtournament\
    where tournament.idtournament = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result); 
    });
};

const create =(req,res) => {
    let name= req.body.name;
    let idtournament =req.body.tournament;
    let sql = "insert into tournament (name, idtournament)\
    values (?,?)";
    connection.query(sql, [name,idtournament], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const update =(req,res) => {
    let name= req.body.name;
    let idtournament =req.body.tournament;
    let sql = "update tournament\
    set name=?,idtournament=?\
    where idtournament = ?";
    connection.query(sql, [name,idtournament], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const deletes =(req,res) => {
    let idtournament = req.params.id;
    let sql = "DELETE FROM tournament where idtournament= ?";
    connection.query(sql, [idtournament], (err, result) => {
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
