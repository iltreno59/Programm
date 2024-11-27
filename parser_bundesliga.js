const request = require('request');
const cheerio = require('cheerio');

let iteration = 1;
const matches = [];

async function send_request(week) {
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
                const match_number = iteration;
                iteration++;
                const element_team_name = $('div.matchRow.elevation-t-card.ng-star-inserted .container .d-xl-block');
                const element_score = $('div.matchRow.elevation-t-card.ng-star-inserted .score');
                const match = {
                    match_number: match_number,
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

module.exports = async function getAllMatches() {
    for (let week = 1; week <= 34; week++) {
        try {
            await send_request(week);
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
            console.error(`Error during request for week ${week}: ${err.message}`);
        }
    }
    return matches;
}

function print_body(){
    const options = {
        url: `https://www.bundesliga.com/en/bundesliga/matchday/2023-2024/1`,
        method: 'GET'
    };
}