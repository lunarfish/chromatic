// const express = require('express');
const express = require('serverless-express/express');

var createError = require('http-errors');
var finale = require('finale-rest');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const nunjucks = require('nunjucks');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const paletteRouter = require('./routes/palette');
const posterizeRouter = require('./routes/posterize');
const imageRouter = require('./routes/image');
const mapRouter = require('./routes/map');
const scheduleRouter = require('./routes/schedule');
const dbTestConnectionRouter = require('./routes/db-test-connection');

//var database = require('./db/connect');

var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'public')));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/palette', paletteRouter);
app.use('/posterize', posterizeRouter);
app.use('/image', imageRouter);
app.use('/map', mapRouter);
app.use('/schedule', scheduleRouter);


app.run = async (route) => {
	return scheduleRouter.handle({ url: route, method: 'GET' }, { end: console.log });
}
app.use('/db.test.connection', dbTestConnectionRouter);
/*
//app.use('/users', usersRouter);
// Initialize finale
finale.initialize({
  app: app,
  sequelize: database
});

// Create REST resource
var Issue = require('./db/models/Issue');

var issueResource = finale.resource({
  model: Issue,
  endpoints: ['/api/issues', '/api/issues/:id']
});

database.sync({ 
	force: false 
});
*/
module.exports = app;