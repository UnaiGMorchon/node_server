import connection from "../config/orm.js";
import Sequelize from "sequelize";
import Stadium from "./stadium.js";
import Tournament from "./tournament.js";


const Game = connection.define("game",{
    idgame:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unsigned: true
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    datetime: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    idstadium: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unsigned: true,
        references:{
            model:"stadium",
            key:"idstadium"
        }
    },
    idtournament: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned: true,
        references:{
            model:"tournament",
            key:"idtournament"
        }
    },
},
{
    freezeTableName: true,
    timestamps: false
});

Game.belongsTo(Stadium,{
    foreignKey: "idstadium",
});
Stadium.hasMany(Game,{
    foreignKey: "idstadium",
});

Game.belongsTo(Tournament,{
    foreignKey: "idtournament",
});
Tournament.hasMany(Game,{
    foreignKey: "idtournament",
});


export default Game;
