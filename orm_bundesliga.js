const {getAllMatches} = require('./parser_bundesliga.js');
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')