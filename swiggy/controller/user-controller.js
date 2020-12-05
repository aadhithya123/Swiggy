require('dotenv').config();
const express = require('express');
const router = express.Router();
const verify = require('../config/verifyToken');
const jwtAuth = require('../middleware/jwt-authentication');
const authorizedRoles = require('../middleware/role-authorized');
const User = require('../model/user');
const authController = require('../controller/auth-controller');
const { post } = require('../controller/auth-controller');
const user = require('../model/user');
const jwt = require('jsonwebtoken');

// ======================================  Get All User  ====================================================

router.get('/',(req,res)=>{
    User.fetchAll().then(users=> res.json(users));
});

// ======================================  Get By Id  ====================================================

// const retriveById = (req,res,next)=>{
//       const currentUser = req.user;
//       const id = parseInt(req.params.id);

//     // Only allow admins to access other user records
//     if(id !== currentUser.sub && currentUser.role_id !== 1)
//     {
//         return res.status(401).json({msg:'Unauthorized'});
//     }
//       userService.getById(req.params.id)
//                 .then(user => user ? res.json(user) : res.status(404))
//                 .catch(err=>next(err));
// }
// router.get('/securedArea', jwtAuth, authorizedRoles('ROLE_ADMIN'), (req, res) => {
//     res.json({msg: "You made it to the secure area"});
// });


//  ====================================  Secret Token  ====================================================

const secret =async (req,res,next)=>
{     
        let {secretToken} = req.body;
        // Find the account that matches the secret token
        await User.forge({secretToken: secretToken.trim()}).fetch({require:true})
                        .then((Customer)=>{
                            Customer.save({
                                isActive : true,
                                secretToken : 'verified'         // So that db secretToken colum will be empty if token is success
                            })  
                        })
                        .then((customer)=>res.json({success: true, msg:'Thank you! Now you may login now..'}))
                        .catch((error)=>{
                            res.json(error.details[0].message);
                            next(error);
                        })
}

// ========================================== Forgot Password ==============================================

// const forgotPassword = (req,res)=>{
//     const {email} =req.body;
//     User.findOne({
//         where:{email:email},
//     }).then((user)=>{

//     })    
//         const resetSecretToken = jwt.sign(email, process.env.RESET_PASSWORD_KEY, {expiresIn:'20m'})
     
//     })
// }
            // Another URL to see where the JWT token can access the URL

router.get('/secured', verify, (req,res)=>{
          res.json({post:{title:'My first post', description:'You made it to the secure area'}});

})
router.post('/verify', secret, (req,res)=>{
                res.json('You are in user-controller page');            
})
module.exports = router;