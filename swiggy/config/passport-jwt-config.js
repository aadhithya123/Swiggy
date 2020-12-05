const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;               // "passport-jwt" is verifying the token using jsonwebtoken.
const ExtractJwt = require('passport-jwt').ExtractJwt;
 const securityConfig = require('../config/security-config');
const User = require('../model/user');
require('dotenv').config();


module.exports = ()=>{
    const opts= {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');  
    opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

   // Synta : new JwtStrategy(options, verify())
   // Options is an object literal containing options to control how the token is extracted from the request or verified.
   // "jwt_payload" is an object literal containing the decoded JWT payload.
   // Done is a passport error first callback accepting arguments done(error, user, info)

    passport.use(new JwtStrategy(opts, function(jwt_payload, done){   
           // console.log(jwt_payload)             
        User.where('id', jwt_payload.id).fetch({withRelated: 'roles'})             
            .then(user => user ? done(null, user) : done(null, false))
            .catch(err=> done(err , false));
    })); 
};
 
