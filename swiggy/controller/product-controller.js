const Product = require('../model/product');
const express = require('express');
const router = express.Router();
const verify = require('../config/verifyToken');

// ======================================= Add Product =======================================================

router.post('/addProduct', verify, (req,res)=>{

    const {category_id, dealer_id, productName, productPrice, quantity, productDescription, status} = req.body;
    Product.forge({category_id, dealer_id, productName, productPrice, quantity, productDescription, status}).save()
                .then((product) =>{
                    res.json(`successfully Inserted`);
                })
               .catch(err =>res.json(err));
});

// ======================================== Get By ProductName =====================================================

router.get('/getByProduct/:productName', verify, (req,res)=>{

         const {productName} =req.params;
    Product.forge({productName:productName}).fetch()
           .then((product) =>{
             res.status(200).json(product);
            })
           .catch(error => res.status(403).json(error.details[0].message));
});

// ======================================== Get All Product =====================================================

router.get('/', verify, (req,res)=>{

    Product.fetchAll()
           .then((product) =>{
                   res.status(200).json(product);
               })
           .catch(error => res.status(403).json('No Products'));
});

// ======================================== Update Product ====================================================

router.put('/updateProduct/:id', (req,res)=>{
     
    const {id} =req.params;
    Product.forge({id:id}).fetch()
            .then((product)=>{
                product.save({
                    category_id: req.body.category_id,
                    dealer_id: req.body.dealer_id,
                    productName: req.body.productName, 
                    productPrice: req.body.productPrice,
                    quantity: req.body.quantity,
                   productDescription: req.body.productDescription,
                   status: req.body.status
                })
                res.status(200).json(`Successfully Updated`);
            })
           .catch(error =>res.status(403).json(error));
});

// ======================================== Delete Product =================================================

router.delete('/deleteProduct/:id', (req,res)=>{

    Product.forge({id:req.params.id}).fetch({required:true})
           .then((product)=> {
               product.destroy();                       // We want to mention destory() otherwise it will not delete in db
               res.json('Successfully Deleted')
            })
           .catch(err => res.json(err));
});


module.exports = router;