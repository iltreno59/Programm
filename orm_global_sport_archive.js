const { sequelize } = require('./connection.js')
const { global_sport_table } = require('./create_tables.js')
const getAllMatches = require('./parser_global_sport_archive.js')

async function main() {
    let matches = [];
    try {
        sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено');
        matches = await getAllMatches();
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e);
    };
}

main();