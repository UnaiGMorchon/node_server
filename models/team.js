import connection from "../config/orm.js";
import Sequelize from "sequelize";
import Stadium from "./stadium.js";
import Tournament from "./tournament.js";
import Game from "./game.js";


const Team = connection.define("team",{
    idteam:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unsigned: true
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    creation_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    idcaptain: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned: true,
        references:{
            model:"player",
            key:"idplayer"
        }
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
},
{
freezeTableName: true,
timestamps: false

});

Team.belongsTo(Stadium,{
    foreignKey: "idstadium",
});
Stadium.hasMany(Team,{
    foreignKey: "idstadium",
});



// team -- game
Team.belongsToMany(Game,{
    through: "team_has_game",
    timestamps: false,
    foreignKey: "idteam",
    otherKey: "idgame"
});

Game.belongsToMany(Team,{
    through: "team_has_game",
    timestamps: false,
    foreignKey: "idgame",
    otherKey: "idteam"
});

// team -- tournament
Team.belongsToMany(Tournament,{
    through: "tournament_has_game",
    timestamps: false,
    foreignKey: "idteam",
    otherKey: "idtournament"
});

Tournament.belongsToMany(Team,{
    through: "tournament_has_game",
    timestamps: false,
    foreignKey: "idtournament",
    otherKey: "idteam"
});


export default Team;
