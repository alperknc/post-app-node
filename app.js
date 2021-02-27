const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const app = express();

let sessionOptions = session({
    secret: "expresssecretcode",
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})
app.use(sessionOptions);

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