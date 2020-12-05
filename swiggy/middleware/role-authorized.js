const _ = require('lodash');
const user = require('../model/user');


module.exports = (...authorizedRoles)=>{

            return (req, res, next)=>{

            const currentUserRoles = req.user.related('roles').models.map(role => role.attributes.authority);
        console.log(currentUserRoles);
        if(!_.intersection(currentUserRoles, authorizedRoles).length){
            res.status(403);
            res.send('Not Permitted');
            return;
        }
      next();
     }
};

// export const admin =(req,res,next=>{
//         if(!req.user.isAdmin){
//             return res.status(403).send('Nope!')
//         }
//         next();
// }
