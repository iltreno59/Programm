const cron = require('node-cron')
const writeToDB = require('./orm_global_sport_archive.js')
const fs = require("fs");

cron.schedule('*/2 * * * *', function(){
    let data = `${new Date().toUTCString()} : Запуск сбора данных по Global Sport\n`;
    fs.appendFile("cron_global_sport_log.txt", data, function(err){
        if (err) throw err;
        console.log("Status Logged!");
    })
    return new Promise((resolve, reject) => { 
        writeToDB();
        resolve();
    })
})