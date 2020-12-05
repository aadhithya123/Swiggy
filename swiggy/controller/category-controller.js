const express = require('express');
const router = express.Router();
const Category = require('../model/category');
const category = require('../model/category');
const jwt = require('jsonwebtoken');

//=========================================Add Category =====================================================

router.post('/addCategory', (req,res)=>{

        const {dealer_id, categoryName} = req.body;
        Category.forge({dealer_id, categoryName}).save()
                .then((category1)=>{
                    res.json(`Successfully Inserted`);
                })
                .catch(err => console.log(err));
});

//=========================================Get By Id Category ==================================================

router.get('/getCategory/:id', (req,res)=>{
    
    Category.forge({id:req.params.id}).fetch()
            .then((category)=>{
                res.json(category);
            })
            .catch(err => res.json(err));
})

//=========================================Get All Category ==================================================

router.get('/' ,(req,res)=>{

    Category.fetchAll()
            .then((category) =>{
                res.json(category);
            })
            .catch(err =>res.json(err));
}); 

//=========================================Update Category ==================================================

router.put('/updateCategory/:id', (req,res)=>{

            const {id}  =  req.params;
    category.forge({id:id}).fetch()
            .then((category) =>{
              category.save({
                        dealer_id: req.body.dealer_id,      
                        categoryName: req.body.categoryName
             })
             res.json('Successfully Updated')
            })
            .catch(err =>res.json(err));
});

//=========================================Delete Category ==================================================

router.delete('/deleteCategory/:id', (req,res)=>{

    Category.forge({id:req.params.id}).fetch({required:true})
            .then((category)=>{
                    category.destroy();
                    res.json('Successfully Deleted');
            })
            .catch(err => res.json(err))
});

module.exports = router;