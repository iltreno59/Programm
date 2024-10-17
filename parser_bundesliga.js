const request = require('request');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'bundesliga.csv',
    header: [
        { id: 'number', title: 'Number' },
        { id: 'home_team', title: 'Home team name' },
        { id: 'away_team', title: 'Away team name' },
        { id: 'home_score', title: 'Home goals' },
        { id: 'away_score', title: 'Away goals' },
        { id: 'competition', title: 'Competition' },
        { id: 'week', title: 'Week' }
    ]
});

let iteration = 1;
const matches = [];

function send_request(week) {
    return new Promise((resolve, reject) => {
        const options = {
            url: `https://www.bundesliga.com/en/bundesliga/matchday/2023-2024/${week}`,
            method: 'GET'
        };
        request(options, (err, res, body) => {
            if (err) {
                reject(err);
                return;
            }
            const $ = cheerio.load(body);
            const competition = 'Bundesliga';
            for (let i = 0; i < 18; i += 2) {
                const number = iteration;
                iteration++;
                const element_team_name = $('div.matchRow.elevation-t-card.ng-star-inserted .container .d-xl-block');
                const element_score = $('div.matchRow.elevation-t-card.ng-star-inserted .score');
                const match = {
                    number: number,
                    home_team: element_team_name[i].children[0].data,
                    away_team: element_team_name[i + 1].children[0].data,
                    home_score: element_score[i].children[0].data.trim(),
                    away_score: element_score[i + 1].children[0].data.trim(),
                    competition: competition,
                    week: week
                };
                matches.push(match);
            }
            resolve();
        });
    });
}

async function main() {
    for (let week = 1; week <= 34; week++) {
        try {
            await send_request(week);
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
            console.error(`Error during request for week ${week}: ${err.message}`);
        }
    }

    console.log(matches.length);
    await csvWriter.writeRecords(matches);
    console.log(`Количество записей: ${matches.length}`);
    console.log(`Количество столбцов: ${Object.keys(matches[0]).length}`);
}

function print_body(){
const options = {
    url: `https://www.bundesliga.com/en/bundesliga/matchday/2023-2024/1`,
    method: 'GET'
};
request(options, (err, res, body) => {
    if (err) {
        return;
    }
    console.log(body);
});
}

//print_body();

main();