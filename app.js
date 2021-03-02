const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');
const dotenv = require('dotenv');

const app = express();

let sessionOptions = session({
    secret: "expresssecretcode",
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions);
app.use(flash());

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
})

const router = require('./router');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//View
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

//Router
app.use('/', router);

module.exports = app