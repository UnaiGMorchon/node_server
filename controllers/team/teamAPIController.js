import teamController from "./teamController.js";

const getAll = async (req,res) => {
        let result = await teamController.getAll();
        if(result[0] === 0) {
            res.send(result[1]);
        }else {
            let error = result [1];
            res.status(500).send({
                message: error.message || "some error occurred while retrieving teams."
            });
        }
    };
 

const getById = async (req,res) => {
          let id =req.params.id;
         let result = await teamController.getById(id); 
         if(result[0] === 0) {
            let team = result[1];
            if (!team) {
                res.status(404).send({
                    message: `Cannot find team with id=${id}.`
                });
            } else {
                res.send(team);
            }
        } else {
            let error = result[1];
            res.status(500).send({
                    message: error.message || "some error occurred while retrieving team."
                });
            }
};

const create = async (req,res) => {
        let data = {
        name: req.body.name,
        creation_date: req.body.creation_date,
        idcaptain: req.body.idcaptain,
        idstadium: req.body.idstadium
        
    }
        let result = await teamController.create(data);
        if(result[0] === 0) {
            res.send(result[1]);
        } else {
            let error = result[1];
            res.status(500).send({
                message: error.message || "some error occurred while creating team."
            });
        }
    };

const update = async (req,res) => {
            let data= {
            name: req.body.name,
            creation_date: req.body.creation_date,
            idcaptain: req.body.idcaptain,
            idstadium: req.body.idstadium
            }
            let idteam=req.params.id

            let result = await teamController.update(data,idteam);
            if(result[0] === 0) {
                res.send(result[1]);
            } else {
                let error = result[1];
                res.status(500).send({
                message: error.message || "some error occurred while updating team."
        });
    }
}

const deletes = async (req,res) => {
        let idteam=req.params.id;
        let result = await teamController.deletes(idteam);
        if(result[0] === 0) {
            if(result[1] === 0){
                res.status(404).send({
                message: `Team with id=${idteam} not found.`
                });
            }
            else {
            res.send("Team deleted");
            }
        } else {
            let error = result[1];
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