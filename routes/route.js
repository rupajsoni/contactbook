const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

//retrieving contacts
router.get('/contacts', function(req, res, next){
  Contact.find(function(err, contacts){
    res.json(contacts);
  });
});

//add contact
router.post('/contact', function(req, res, next){
  let newContact = new Contact({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    address: req.body.address,
    company: req.body.company
  });

  newContact.save(function(err, contact){
    if(err){
      res.json({msg: 'Failed to add contact'});
    }else{
      res.json({msg: 'Contact successfully added'});
    }
  });
});

//delete contact
router.delete('/contact/:id', function(req, res, next){
  Contact.remove({_id: req.params.id}, function(err, result){
    if(err){
      res.json(err);
    }else{
      res.json(result);
    }
  });
});

module.exports = router;
