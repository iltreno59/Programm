const cron = require('node-cron')
const writeToDB = require('./orm_goal_com.js')
const fs = require("fs");

cron.schedule('*/2 * * * *', function(){
    let data = `${new Date().toUTCString()} : Запуск сбора данных по Goal.com\n`;
    fs.appendFile("cron_goal_com_log.txt", data, function(err){
        if (err) throw err;
        console.log("Status Logged!");
    })
    return new Promise((resolve, reject) => { 
        writeToDB();
        resolve();
    })
})