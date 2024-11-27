const getAllMatches = require('./parser_bundesliga.js')
const { sequelize } = require('./connection.js')
const { bundesliga_table } = require('./create_tables.js')

async function main(){
    let matches = [];
    try {
        sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено');
        matches = await getAllMatches();
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e);
    };
    for (let match of matches){
        const match_object = bundesliga_table.build({
            match_number: match.match_number,
            home_team_name: match.home_team,
            away_team_name: match.away_team,
            home_team_goals: match.home_score,
            away_team_goals: match.away_score,
            competition: match.competition,
            week: match.week
        });
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