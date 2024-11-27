const { sequelize } = require('./connection.js')
const { eurosport_table } = require('./create_tables.js')
const getAllMatches = require('./parser_eurosport.js')

async function main() {
    let matches = [];
    try {
        sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено');
        matches = await getAllMatches();
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e);
    };
    for (let match of matches){
        const match_object = eurosport_table.build({
            match_nubmber: match.number,
            home_team_name: match.home_team,
            away_team_name: match.away_team,
            home_team_goals: match.home_score,
            away_team_goals: match.away_score,
            competition: match.competition,
            match_date: match.date,
        })
        try{
            await match_object.save();
        }
        catch(e){
            if (e.name = 'SequelizeUniqueConstraintError') continue;
            else console.log('Непредвиденная ошибка при внесении данных в БД: ', e)
        }
    }
}

main();