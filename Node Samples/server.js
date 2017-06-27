/**
 * Load modules
 */

var path = require('path'),
    basePath = path.join(__dirname),
    config = require(path.join(basePath, 'config', 'config')),
    bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	dbService = require(path.join(basePath, 'services', 'db.service')),
	express = require('express'),
	expressHandlebars = require('express-handlebars'),
	favicon = require('serve-favicon'),
	http = require('http'),
    mailService = require(path.join(basePath, 'services', 'mail.service')),
	morgan = require('morgan');

/**
 * Connect to default database
 */

dbService.connect(config.db.uri, config.db.options);

/**
 * Init & settings
 */

var app = express();

// Environment
app.set('env', config.env);
app.set('port', parseInt(process.env.PORT, 10) || 3000);

// Response headers
app.set('x-powered-by', false);

// Favicon
app.use(favicon(path.join(basePath, 'public', 'favicon.ico')));

// Mail service
mailService.init();

/**
 * Middleware
 */

// Serve static
app.use(express.static(path.join(basePath, 'public')));

// Console logger
app.use(morgan('dev'));

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Templating - handlebars
 */

app.engine('hbs', expressHandlebars({
	layoutsDir: path.join(basePath, 'views', 'layouts'),
	partialsDir: path.join(basePath, 'views', 'partials'),
	extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(basePath, 'views'));

/**
 * Routes
 */

// Assign base routes
app.use('/', require(path.join(basePath, 'routes', 'base.routes')));

// Errors
app.use(function (err, req, res, next) {

	// Error data
	var errData = {
			messages: err.message
		},
		errStatus = err.status || 500;

	// Only include stack trace during development
	if(app.get('env') === 'development' && err.stack) {
		
		errData.stack = err.stack;
		
	}

	/**
	 * JSON response
	 */

	if(req.xhr || req.headers.accept.indexOf('json') > -1) {
		
		return res.status(errStatus).json({
			error: errData
		});
		
	}

	/**
	 * HTML response
	 */
	
	// Template header title
	errData.headerTitle = 'Oops! Something Is Amiss';
	
	// Template expects error messages to be an array
	errData.messages = [errData.messages];
	
	var vm = {
            pageTitle: errData.headerTitle,
            layout: 'site-primary-layout',
            partialName: 'site-error-generic-partial',
            pageTitle: config.errors.defaultPageTitle,
            error: errData
        };

	return res.status(errStatus).render('site-generic-primary-view', vm);
	
});

// Invalid page request
app.use('*', function (req, res, next) {
	
	var vm = {
            pageTitle: 'Page Not Found',
			layout: 'site-primary-layout',
			partialName: 'site-error-generic-partial',
			error: {
				title: 'Page Not Found',
				messages: [
					'The page you are looking for was moved, removed, renamed or may never have existed.',
					'Please check the web address and try again.'
				]
			}
		};

	return res.status(404).render('site-generic-primary-view', vm);

});

/**
 * Start server
 */

var server = http.createServer(app);

server.listen(app.get('port'), function () {

	console.log('Express server listening on port ' + server.address().port);

});