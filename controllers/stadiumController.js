import connection from "../config/db.js";

const getAll = (req,res) => { // los => igual que funcion getAll
    let sql = "SELECT idstadium, stadium.name, stadium.address, stadium.capacity\
    FROM stadium\
    left join game on game.idstadium = stadium.idstadium\
    ";
connection.query(sql, (err,result) => {
    if(err) throw err;
    res.send(result);
});  
};

const getById =(req,res) => {
    let sql = "SELECT stadium.idstadium, stadium.name, stadium.address, stadium.capacity\
    FROM stadium\
    left join game on game.idstadium = stadium.idstadium\
    where stadium.idstadium = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result); 
    });
};

const create =(req,res) => {
    let name= req.body.name;
    let address = req.body.address;
    let capacity =req.body.capacity;
    let idstadium =req.body.idstadium;
    let sql = "insert into stadium (name,address,capacity,idstadium)\
    values (?,?,?,?)";
    connection.query(sql, [name,address,capacity,idstadium], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const update =(req,res) => {
    let name= req.body.name;
    let address= req.body.address;
    let capacity =req.body.capacity;
    let idstadium = req.params.id;
    let sql = "update stadium\
    set name=?, address=?, capacity=?, idstadium=?\
    where idstadium = ?";
    connection.query(sql, [name,address,capacity,idstadium], (err, result) => {
        if(err) throw err;
        res.send(result); 
        });
}

const deletes =(req,res) => {
    let idstadium = req.params.id;
    let sql = "DELETE FROM stadium where stadium.idstadium= ?";
    connection.query(sql, [idstadium], (err, result) => {
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
