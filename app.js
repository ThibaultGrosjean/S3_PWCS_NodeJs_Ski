/** Node modules : 

npm install express
npm install body-parser 
npm install cookie-parser 
npm install express-session 
npm install express-validator 
npm install mysql 
npm install twig 
npm install csurf 
npm install bcrypt

**/

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const csrf = require('csurf')
const csrfProtection = csrf({ 
	cookie: true 
});

const session = require('express-session');
const sessionSecret = session({
    secret: 'fyHy3sNG__$8p$Bt',
    resave: true,
    saveUninitialized: true
});

const app = express();

const indexController = require('./controllers/indexController');
const skisController = require('./controllers/skisController');
const typesSkisController = require('./controllers/typesSkisController');
const userController = require('./controllers/userController');

const port = 8888;


app.set('views', __dirname + '/views');
app.set('view engine', 'twig');


app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', indexController.index);

app.get('/skis', skisController.getSkis);

app.get('/list/skis', skisController.getSkis);

app.get('/typeSkis/list', typesSkisController.getTypeSkis);

app.get('/typeSkis/showDetails', typesSkisController.getTypeSkisDetails);

app.get('/add/skis', skisController.addSki);

app.post('/add/skis',skisController.validationResult, skisController.addSkiValidForm);

app.get('/edit/:id/skis', csrfProtection, skisController.editSki);

app.post('/edit/skis', skisController.validationResult, skisController.editSkiValidForm);

app.get('/delete/:id/skis', csrfProtection, skisController.deleteSki);

app.get('/register', userController.register);

app.post('/register',userController.validationResult, userController.registerValidForm);

app.get('/login', userController.login);

app.post('/login',sessionSecret, userController.validationResult, userController.loginValidForm);

app.get('/logout', userController.logout);

app.listen(port, () => {
    console.log(`Écoute sur le port : ${port}`);
});