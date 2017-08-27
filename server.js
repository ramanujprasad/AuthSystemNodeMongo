var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./models/user');
var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

// invoke an instance of express application.
var app = express();

// set our application port
app.set('port', process.env.PORT || 9000);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'USER_COOKIE',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.USER_COOKIE && !req.session.user) {
        res.clearCookie('USER_COOKIE');        
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.USER_COOKIE) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});


// route for user register
app.route('/register')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/register.html');
    })
    .post((req, res) => {
		let user = new User ({
            name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		  })

		user.save((err) => {
			if (err) {
				return res.send(err);
			}
            req.session.user = user;
			res.redirect('/dashboard');
		});		
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
		
        res.sendFile(__dirname + '/public/login.html');
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
			
		User.findOne({username: username}, function(err, user) {
			
			if (err) {
                res.redirect('/login');
            } else if (user !== null && (user.password !== password)) {
                res.redirect('/login');
            } else {
                req.session.user = user;
                res.redirect('/dashboard');
            }
		});
    });


// route for user's dashboard

app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.USER_COOKIE) {
        res.sendFile(__dirname + '/public/dashboard.html');
    } else {
        res.redirect('/login');
    }
});


// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.USER_COOKIE) {
        res.clearCookie('USER_COOKIE');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));