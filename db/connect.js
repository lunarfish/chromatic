const Sequelize = require('sequelize');
/*
const conn = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  storage: 'sequelize/project_tetris.sqlite'
});
*/
const conn = new Sequelize('chromatic', 'postgres', 'docker', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});
module.exports = conn;