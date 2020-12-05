const bookeshelf = require('../config/bookshelf-instance');
const Dealer = require('../model/dealer');
const express = require('express');
const dealer = require('../model/dealer');
const router = express.Router();


// ========================================Add Dealer =======================================================

router.post('/addDealer', (req,res)=>{

    const {dealerName, phone, address, location} = req.body;
    Dealer.forge({dealerName, phone, address, location}).save()
          .then((dealer) =>{
              res.json(`Successfully Inserted`);
          })
          .catch(err => res.json(err))
});

// ========================================Get All Dealer =======================================================

router.get('/', (req,res)=>{
    Dealer.forge({id:req.params.id}).fetchAll()
          .then((dealer) => res.status(200).json(dealer))
          .catch(err => res.json(err))
});

// ========================================Update Dealer =======================================================

router.put('/updateDealer/:1', (req,res)=>{

    const {dealerName, phone, address, location} = req.body;
    Dealer.forge({id:req.params.id}).fetch()
          .then((dealer)=>{
              dealer.save({
                dealerName: dealerName,
                phone: phone,
                address: address,
                location: location
              });
          })
          .then((dealer1) => res.json(dealer1))
          .catch(err => res.json(err));
});

// ========================================Delete Dealer =======================================================

router.delete('/deleteDealer/:id', (req,res)=>{
    Dealer.forge({id:req.params.id}).fetch()
          .then((dealer) =>{
              dealer.destroy();
              res.status(200).json('Successfully Deleted');
          })
          .catch(err => res.status(403).json(err));
})

module.exports = router;