
//========================= Passport JWT Authentication =============================================
require('dotenv').config();
const Joi =require('@hapi/joi');
const express = require('express'); 
const router = express.Router();
const Promise = require('bluebird');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateBody = require('../config/validation');
const authenticate = require('../middleware/jwt-authentication');
const LocalStrategy = require('passport-local').Strategy;
const randomString = require('randomstring');
const mailer = require('./mailer');
// ========================================== Login ====================================================



router.post('/login',(req, res) => {
    
    const {username, password} = req.body;    
    Promise.coroutine(function* () {
        const user = yield User.where('username',username).fetch()
        if(user.isActive){
            res.json('You need to verify the email first');
        }
        const isValidPassword = yield user.validPassword(password);
        if(isValidPassword) {
                const username1 = req.body.username;
                const user1 = {name: username1};
                const secretToken = jwt.sign(user1, process.env.ACCESS_TOKEN_SECRET , {expiresIn:'1 hrs'});      // jwt({id:user.id}):- jwt.sign(payload, secretOrPrivateKey, [options, callback])
                res.header('auth-token', secretToken).json({msg:'Login Success',token: `${secretToken}`});
        }else {
            res.json({msg: 'Password is incorrect'});
        }
    })().catch(err => res.json({msg:'Username is incorrect'}));
});



// ========================================  Sign In  ==================================================

router.post('/register', async (req,res)=>{
    
    const {username, password, email, phone, address} = req.body;

    const schema = Joi.object({
        username:Joi.string().min(3).required(),
        password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required().options({ language: { string: { regex: { base: 'should be atleast 8, having One Caps, One Number, and One special character eg:{#?!@$%^&*-}' } }, label: 'Password' } }),
        secretToken: Joi.string(),
        isActive : Joi.boolean(),
        email : Joi.string().email().required(),
        phone:Joi.string().min(10).max(10).required(),
        address:Joi.string().required()
    });
     const {error} =schema.validate(req.body);
     // User with this email already exits
    User.forge({email:req.body.email}).fetch().then((user)=>{
        if(!user.email){
            return res.status(400).json('User with this email already exits');
        }
    })
        if(!error)
        {     // Generate secretToken
            let secretToken = randomString.generate();
            // flag the account as inactive
            let isActive = false;
    User.forge({ username, password, secretToken, isActive, email, phone, address}).save()
                 .then((user)=>
                 {
             //    res.json(user.omit('password','role_id'));
                    res.json('Successfully Register');
             // Compose mail
             const html = `Hi These
                    <br/>
                    Thank you for Registering!
                    <br/><br/>
                    Please verify your mail by typing the following Token.
                    <br/><br/>
                    Token: <b>${secretToken}<b/>
                    <br/>
                    On the Following Page:
                    <a href ="http://localhost:5000/users/verify">http://localhost:5000/users/verify<a/>
                    <br/><br/>
                    Have a pleasant Day`;
            
             mailer.sendEmail('admin@codelife.com', req.body.email, 'Please verify your email!!', html);
             res.json({success: true, msg:'Please Check Your Email'});
                }).catch(err=> res.json('Some problem'));
}
        else
        {
                res.json(error.details[0].message);
        }   
});

module.exports = router;

