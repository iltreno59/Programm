const cron = require('node-cron')
const writeToDB = require('./orm_yahoo.js')
const fs = require("fs");

cron.schedule('*/2 * * * *', function(){
    let data = `${new Date().toUTCString()} : Запуск сбора данных по Yahoo\n`;
    fs.appendFile("cron_yahoo_log.txt", data, function(err){
        if (err) throw err;
        console.log("Status Logged!");
    })
    return new Promise((resolve, reject) => { 
        writeToDB();
        resolve();
    })
})