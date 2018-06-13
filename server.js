/**
 * ############################
 * on Window
 * Command to run 
 * 
 * $ set NODE_ENV={{dev / test}}
 * $ node server.js
 * 
 * ############################
 * on Linux
 * Commang to run
 * 
 * $ NODE_ENV={{dev / test}} node server.js
 * 
 * 
 */

// Get dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');
const http = require('http');
const https = require('https');
const path = require('path');
const config = require('config');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const winston = require('winston');

require('winston-daily-rotate-file');

var env = process.env.NODE_ENV || 'development';
var envData = require(__dirname + '/config/config.json')[env];


const bodyParser = require('body-parser');
const browser = require('browser-detect');

const SamlStrategy = require('passport-saml').Strategy;
const passport = require('passport');
const utill = require('./utill');

const app = express();

// https://expressjs.com/en/advanced/best-practice-security.html
var helmet = require('helmet')

/**
 * #######################################################################################
 * ########################### [Start] declaration section ###############################
 */

 /**
 * Get port from environment and store in Express.
 */

const port = envData.Server.PORT;
app.set('port', port);

//var pathLog = path.join(__dirname, 'logs');

// ensure log directory exists
//fs.existsSync(envData) || fs.mkdirSync(envData)

var accessLogDirectory = envData.accessLogPath//path.join(__dirname + '/logs', 'alws-web');
var proxyLogDirectory = envData.proxyLogPath//path.join(__dirname + '/logs', 'alws-proxy');

// ensure log directory exists
fs.existsSync(envData.accessLogPath) || fs.mkdirSync(envData.accessLogPath)
fs.existsSync(envData.proxyLogPath) || fs.mkdirSync(envData.proxyLogPath)

// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: accessLogDirectory
})

var transportProxy = new (winston.transports.DailyRotateFile)({
    filename: proxyLogDirectory + '/proxy_%DATE%.log',
    datePattern: 'YYYY_MM_DD',
    maxSize: '100m',
});

var loggerProxy = new (winston.Logger)({
    transports: [
        transportProxy
    ]
});

//custom date set time zone +7
morgan.token('date', function () {
    var p = new Date().toString().replace(/[A-Z]{3}\+/, '+').split(/ /);
    return (p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5]);
});

// proxy middleware options
const options = {

    target: envData.targetUri, // target host
    changeOrigin: true,
    pathRewrite: {
        '^/api*': '/api/'
    },
    logProvider: function (provider) {

        var myCustomProvider = {
            log: console.log,
            debug: loggerProxy.debug,
            info: loggerProxy.info,
            warn: loggerProxy.warn,
            error: loggerProxy.error
        }

        return myCustomProvider;

    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        // Log outbound request to remote target
        loggerProxy.info('-->  ', req.method, req.path, '->', envData.targetUri + proxyReq.path);
    },
    onError: function onError(err, req, res) {
        loggerProxy.error(' -- Error when connecting to remote server. ' + err);
        res.status(500);
        res.json({ error: 'Error when connecting to remote server.' });
    },
    logLevel: 'debug',
    secure: true
};

const allwProxy = proxy(options);

let samlStrategy = new SamlStrategy(
    {

        callbackUrl: 'https://10.137.16.118/login/callback',
        entryPoint: 'https://test-ids.ais.co.th/samlsso',
        //cert: 'MIICNTCCAZ6gAwIBAgIES343gjANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxDTALBgNVBAoMBFdTTzIxEjAQBgNVBAMMCWxvY2FsaG9zdDAeFw0xMDAyMTkwNzAyMjZaFw0zNTAyMTMwNzAyMjZaMFUxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzENMAsGA1UECgwEV1NPMjESMBAGA1UEAwwJbG9jYWxob3N0MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTousMzOM4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe0hseUdN5HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXnRS4HrKGJTzxaCcU7OQIDAQABoxIwEDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcNAQEFBQADgYEAW5wPR7cr1LAdq+IrR44iQlRG5ITCZXY9hI0PygLP2rHANh+PYfTmxbuOnykNGyhM6FjFLbW2uZHQTY1jMrPprjOrmyK5sjJRO4d1DeGHT/YnIjs9JogRKv4XHECwLtIVdAbIdWHEtVZJyMSktcyysFcvuhPQK8Qc/E/Wq8uHSCo=',
        issuer: 'ACCALW',
        logoutCallback: 'https://10.137.16.118/logout/callback',
        acceptedClockSkewMs: '-1'  //check time between node and provider
    },
    function (profile, done) {
        console.log(profile)
        return done(null, {
            nameID: profile.nameID,
            nameIDFormat: profile.nameIDFormat,
            sessionIndex: profile.sessionIndex,
            pincode: profile.pincode,
            username: profile.username
        });
    })

passport.use(samlStrategy);

//app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/**
 * ############################ [End] declaration section ################################
 * #######################################################################################
 */

/**
 * #######################################################################################
 * ######## [Start] config express app (sequence does matter, so carefully edit) #########
 */

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup the logger
app.use(morgan('[:date] :method :url HTTP/:http-version - :remote-addr :remote-user :status :res[content-length] kb :response-time ms ', { stream: accessLogStream }));

/**
 * ##### [Start] VA Scan #####
 */
// Unnecessary HTTP Method Enable
app.use((req, res, next) => {
    if (req.method != 'POST' && req.method != 'GET') {
        res.sendStatus(405);
    } else {
        next();
    }
});
/**
 * ##### [End] VA Scan #####
 */

/**
* Redirect new browser login C2A.
*/
let ieFlag = false

app.use((req, res, next) => {

    const result = browser(req.headers['user-agent']);
    console.log(result);
    if (result.name == 'ie') {
        ieFlag = true
        next();
    }
    else {
        ieFlag = false
        next();
    }
});

app.use(passport.initialize());

//Set Access-Control-Allow-Origin
app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

// Information Leakage from HTTP Response Header
// put here instead of move /api under helmet due to too much header from helmet
app.disable('x-powered-by');
app.use('/api', allwProxy);

/**
 * ##### [Start] VA Scan #####
 */

// app.use(function (req, res, next) {
//     // X-Frame Clickjacking
//     res.header("X-Frame-Options", "DENY");
//     res.header("Content-Security-Policy", "frame-ancestors 'self'");
//     res.header("X-Content-Security-Policy", "frame-ancestors 'self'");
    
//     // Insecure missing HTTP headers  attributes
//     res.header("X-Content-Type-Options", "nosniff");
//     res.header("X-XSS-Protection", "1; mode=block");
//     res.header("Strict-Transport-Security", "max-age=63072000;includeSubdomains;preload;");
    
//     next();
// });

app.use(helmet());
/**
 * ##### [End] VA Scan #####
 */

// set no cache
app.use(helmet.noCache());

// Point static path to dist
app.use(express.static(path.join(__dirname, './dist')));

 /**
 * ######## [End] config express app (sequence does matter, so carefully edit) ###########
 * #######################################################################################

 */

/**
 * #######################################################################################
 * ############################ [Start] path register section ############################
 */

app.get('/login/ids', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    function (req, res) {
        console.log('req:', req)
        res.redirect('/');
});


app.get('/routeC2a', (req, res) => {

    res.sendFile(path.join(__dirname, './loginC2A.html'));
});

app.post('/login', (req, res) => {
    console.log('ieFlag', ieFlag)
    console.log(req.body)
    let pin = req.body.pin
    let username = req.body.username
    let param = 'pin=' + pin + '&username=' + username+ '&router=loginC2A'
    console.log(param)
    if (ieFlag) {
        res.redirect('/routeC2a?' + param)
    } else {
        res.redirect('https://10.137.16.118/index.html?' + param)
    }
});

// app.post('/login/callback', (req, res) => {
//     let userInfo = utill.getUserInfoByIds(req.body)
//     let pin = userInfo.pinCode
//     let username = userInfo.userName
//     let param = 'router=loginC2A&pin=' + pin + '&username=' + username
//     if (utill.isNotEmpty(pin) && utill.isNotEmpty(username)) {
//         res.redirect('https://10.137.16.118/index.html?' + param)
//     } else if (!utill.isNotEmpty(pin)) {
//         throw new Error('IDS callback pin is undefined')
//     } else if (!utill.isNotEmpty(username)) {
//         throw new Error('IDS callback username is undefined')
//     }

// });
app.post('/login/callback', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    function (req, res) {
        console.log('callback login')
        console.log('req:', req.user)
        let pincode = req.user.pincode
        let username = req.user.username
        let nameID = req.user.nameID
        let nameIDFormat = req.user.nameIDFormat
        let sessionIndex = req.user.sessionIndex
        let param = 'router=loginC2A&pin=' + pincode + '&username=' + username
        if (utill.isNotEmpty(pincode) && utill.isNotEmpty(username)) {
            res.redirect('https://10.137.16.118/index.html?' + param)
        } else if (!utill.isNotEmpty(pin)) {
            throw new Error('IDS callback pin is undefined')
        } else if (!utill.isNotEmpty(username)) {
            throw new Error('IDS callback username is undefined')
        }
});

app.post('/logout/callback', (req, res) => {
    console.log('callback logout ids')
    console.log(req)
});

app.post('/logout', (req, res) => {
    let obj = {
        user: {
            nameID: req.body.nameID,
            nameIDFormat: req.body.nameIDFormat,
            sessionIndex: req.body.sessionIndex
        }
    }

    console.log(obj)
    console.log(req.body)
    samlStrategy.logout(obj, function (err, uri) {
        console.log('succues logout')
        console.log(uri)
        return res.redirect(uri);
    });
});

/**
 * ##### [README] get * must put on the bottom of path register section #####
 */
// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

/**
 * ############################# [End] path register section #############################
 * #######################################################################################
 */

/**
 * Create HTTP server.
 */
var privateKey = fs.readFileSync(envData.sslPath + '/key.pem', 'utf8');
var certificate = fs.readFileSync(envData.sslPath + '/cert.pem', 'utf8');

var credentials = {
    //secureOptions: [require('constants').SSL_OP_NO_TLSv1, require('constants').SSL_OP_NO_TLSv1_1].join(':'),
    secureProtocol: "TLSv1_2_server_method",
    key: privateKey,
    cert: certificate,
    passphrase: envData.sslPassword,
    ciphers: envData.sslCipherSuites.join(':')
};

const server = https.createServer(credentials, app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`allowance frontend running on port : ${port}`));