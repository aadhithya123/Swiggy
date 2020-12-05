const bookshelf= require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const Role= require('./role');
const securityConfig=require('../config/security-config');

module.exports= bookshelf.Model.extend({
    tableName:'users',
    roles(){
        return this.hasMany(Role,'users');
    },
    validPassword(password){
                 return bcrypt.compareAsync(password, this.attributes.password);
    },
    initialize(){
                this.on('saving', model => {
                        if(!model.hasChanged('password')) return;
                    return Promise.coroutine(function*(){
                            const salt= yield bcrypt.genSaltAsync(securityConfig.saltRounds);
                            const hashedPassword =yield bcrypt.hashAsync(model.attributes.password, salt);
                            model.set('password', hashedPassword);
                    })(); 
                });
            }
        
});
