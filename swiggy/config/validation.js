'use strict';

const Joi = require('@hapi/joi');


// module.exports ={
//     validate : (schema)=>{ 
//         return (req, res, next)=>{
//             const result = Joi.validate(req.body, schema);
//             if(result.error){
//                 return res.status(400).json(result.error);
//             }
//             if(!req.value){req.value = {};}
//             req.value['body'] = result.value;
//             next();
//         }  
//     },
//     schema: {
//         authSchema: Joi.object().keys({
//             username : Joi.string().min(3).max(30).required(),
//             password : Joi.string().required(),
//             email : Joi.string()
//                        .email({minDomainSegments: 2, tlds : { allow : ['com','net']}}),
//             phone : Joi.string().regex(/[0-9]{10}/).required(),
//             address : Joi.string().required()
//         })
//     }



// }

// module.exports = {
//     createUser:{
//         body : {

//             username : Joi.string().min(3).max(30).required(),
//             password : Joi.string()
//                          .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
//                          .required(),
//             email : Joi.string()
//                        .email({minDomainSegments: 2, tlds : { allow : ['com','net']}}),
//             phone : Joi.string().pattern(new RegExp(/[0-9]{10}/)).required(),
//             address : Joi.string().required()
//         }
//     },


//     login : {
//        body:{
//             username : Joi.string().required(),
//             password : Joi.string().required(),
//         }
//     },
    
    // resetPassword : {
    //     body : {
    //         opt : Joi.string().required(),
    //         newPassword : Joi.string().required()
    //         .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    //         .options({ language: { string: { RegExp: { base: 'should be have 8, having One Caps, One Number, and One special character' } }, label: 'Password' } }),
    //         confirmPassword : Joi.any().valid(Joi.ref('newPassword')).options({language: { any: { allowAny: 'Must match password'}, label: 'Password Confirmation' } } )
            
    //     }
    // }
// }

