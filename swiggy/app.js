const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const configurePassport = require('./config/passport-jwt-config');
const authController = require('./controller/auth-controller');
const userController = require('./controller/user-controller');
const productController = require('./controller/product-controller');
const categoryController = require('./controller/category-controller');
const dealerController = require('./controller/dealer-controller');
const rollBased = require('./middleware/role-authorized');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(passport.initialize());
configurePassport();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// ========================================== Middleware =====================================================

app.use('/auth', authController);
app.use('/users', userController);
app.use('/product', productController);
app.use('/category', categoryController);
app.use('/dealer', dealerController);

app.listen(4000,()=>console.log('The port is Started'));