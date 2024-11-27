const request = require('request');

const matches = [];

let currentDate = new Date('2024-09-15');
const endDate = new Date('2024-10-15');

let iteration = 1;

function send_request(date){
    return new Promise((resolve) =>{
        const formattedDate = date.toISOString().split('T')[0]; // Форматируем дату в YYYY-MM-DD

        const options = {
            url: `https://netsport.eurosport.io/?variables=%7B%22sportNetsportId%22%3A%2222%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22CALENDAR%22%2C%22id%22%3A%22${formattedDate}%22%7D%5D%2C%22first%22%3A20%2C%22after%22%3Anull%2C%22matchCardHeaderContext%22%3A%22DEFAULT%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22a772c874c58dc285149ee0698eaa17431655eb815259a32c13f5ec66caa26df7%22%7D%7D`,
            method: 'GET',
            headers :{
                'domain': 'www.eurosport.com'
            }
        };
        request(options, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            const data_json = JSON.parse(body);
            for(let i = 0; i < data_json.data.scoreCenterLiveboxByNetsportSportId.matchCards.edges.length; i++){
                try{
                    const number = iteration;
                    const home_team = data_json.data.scoreCenterLiveboxByNetsportSportId.matchCards.edges[i].node.home.name;
                    const away_team = data_json.data.scoreCenterLiveboxByNetsportSportId.matchCards.edges[i].node.away.name;
                    const home_score = data_json.data.scoreCenterLiveboxByNetsportSportId.matchCards.edges[i].node.scoreBox.home.score;
                    const away_score = data_json.data.scoreCenterLiveboxByNetsportSportId.matchCards.edges[i].node.scoreBox.away.score;
                    const competition = data_json.data.scoreCenterLiveboxByNetsportSportId.matchCards.edges[i].node.scoreCenterClassification.competition.competitionBaseName;
                    const match = {
                        number: number,
                        home_team: home_team,
                        away_team: away_team,
                        home_score: home_score,
                        away_score: away_score,
                        competition: competition,
                        date: formattedDate
                    }
                    matches.push(match);
                    iteration++;
                }
                catch(err){
                    continue;
                }
            }
            resolve();
        });
    });
}

module.exports = async function getAllMatches() {
    while (currentDate <= endDate){
        await send_request(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
    return matches;
}

//main();

function print_body(){
    const options = {
        url: `https://netsport.eurosport.io/?variables=%7B%22sportNetsportId%22%3A%2222%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22CALENDAR%22%2C%22id%22%3A%222024-10-14%22%7D%5D%2C%22first%22%3A20%2C%22after%22%3Anull%2C%22matchCardHeaderContext%22%3A%22DEFAULT%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22a772c874c58dc285149ee0698eaa17431655eb815259a32c13f5ec66caa26df7%22%7D%7D`,
        method: 'GET',
        headers :{
            'domain': 'www.eurosport.com'
        }
    };
    request(options, (err, res, body) => {
        if (err) {
            return;
        }
        console.log(body);
    });
}