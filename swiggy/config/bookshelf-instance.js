const dbConfig=require('./database-config');
const knex= require('knex')(dbConfig);
module.exports=require('bookshelf')(knex);