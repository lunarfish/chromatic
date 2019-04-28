var Sequelize = require('sequelize');
var database = require('../connect');

var Issue = database.define('Issue', {
  title: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  created: {
  	type: Sequelize.DATE,
  	allowNull: false,
  	defaultValue: Sequelize.NOW
  },
  done: {
  	type: Sequelize.BOOLEAN,
  	defaultValue: false
  }
});

module.exports = Issue;
