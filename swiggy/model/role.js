const bookshelf= require('../config/bookshelf-instance');
const User = require('./user');

module.exports = bookshelf.Model.extend({
    tableName:'role',
    users(){
        return this.belongsTo(User ,'users' );
    }
})