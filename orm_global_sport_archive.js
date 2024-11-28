const { sequelize } = require('./connection.js')
const { global_sport_table } = require('./create_tables.js')
const getAllMatches = require('./parser_global_sport_archive.js')

async function writeToDB() {
    let matches = [];
    try {
        sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено');
        matches = await getAllMatches();
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e);
    };
    for (let match of matches){
        const match_object = global_sport_table.build({
            match_nubmber: match.number,
            home_team_name: match.home_team,
            away_team_name: match.away_team,
            home_team_goals: match.home_team_score,
            away_team_goals: match.away_team_score,
            match_date: match.date,
            match_time: match.start_time
        })
        try{
            await match_object.save();
        }
        catch(e){
            if (e.name = 'SequelizeUniqueConstraintError') continue;
            else {
                console.log('Непредвиденная ошибка при внесении данных в БД: ', e)
                break;
            }
        }
    }
    
}

//main();