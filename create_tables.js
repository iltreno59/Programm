const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection.js');

try {
    sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}

const tables = []

const bundesliga_table = sequelize.define(
    'bundesliga',
    {
        // attribs
        match_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        home_team_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        away_team_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        home_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        away_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        competition: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'Bundesliga,'
        },
        week: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        }
    }
)
tables.push(bundesliga_table);

const eurosport_table = sequelize.define(
    'eurosport',
    {
        //attribs
        match_nubmber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        home_team_name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        away_team_name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        home_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        away_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        competition: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        match_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }
)
tables.push(eurosport_table);

const global_sport_table = sequelize.define(
    'global_sport',
    {
        //attribs
        match_nubmber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        home_team_name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        away_team_name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        home_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        away_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        match_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        match_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    }
)
tables.push(global_sport_table);

const goal_com_table = sequelize.define(
    'goal_com',
    {
        //attribs
        match_nubmber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        competition: {
            type: DataTypes.TEXT,
            allowNull: true,
        },home_team_name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        away_team_name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        home_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        away_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        home_team_red_cards: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        away_team_goals_red_cards: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        match_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }
)
tables.push(goal_com_table);

const yahoo_table = sequelize.define(
    'yahoo',
    {
        //attribs
        match_nubmber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        competition: {
            type: DataTypes.TEXT,
            allowNull: true,
        },home_team_name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        away_team_name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        home_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        away_team_goals: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        week: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        competition: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'Premier League,'
        },
    }
)
tables.push(yahoo_table);

for (let table of tables){
    table.sync({alter: true});
}

//await sequelize.close();