const bookshelf = require('../config/bookshelf-instance');
const Category = require('./category');
const Dealer = require('./dealer');

module.exports = bookshelf.Model.extend({
    tableName: 'product',
    category(){
        return this.belongsTo(Category)
    },
    dealer(){
        return this.belongTo(Dealer)
    }
});

