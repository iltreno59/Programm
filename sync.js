const { sequelize } = require('./connection.js')
const all_tables = require('./create_tables.js')

function sync_all_tables(){
    try {
        sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено');
        for (let table of all_tables.tables){
            table.sync({alter: true});
        }
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e);
    }
}

sync_all_tables();