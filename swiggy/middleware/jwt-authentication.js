const passport = require('passport');


//   Authenticate requests
//   Use passport.authenticate() specifying 'JWT' as the strategy.

// module.exports =
//  passport.authenticate('local', {successRedirect:'/',
//                                                  failureRedirect:'/login',
//                                                  failureFlash:'Invalid username or password.'})



 module.exports = passport.authenticate('jwt', { session: false });