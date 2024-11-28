const cron = require('node-cron')
const writeToDB = require('./orm_eurosport.js')
const fs = require("fs");

cron.schedule('*/2 * * * *', function(){
    let data = `${new Date().toUTCString()} : Запуск сбора данных по Eurosport\n`;
    fs.appendFile("cron_eurosport_log.txt", data, function(err){
        if (err) throw err;
        console.log("Status Logged!");
    })
    return new Promise((resolve, reject) => { 
        writeToDB();
        resolve();
    })
})