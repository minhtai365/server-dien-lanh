var express = require('express');
var router = express.Router();
var Service = require('../models/service');

//get catelogy
router.get('/', (req, res, next) => {
    Service.find((err, dt) => {
      res.send(dt)
    })
  })
  //create catelogy
  router.post('/set', (req, res, next) => {
    if (req.body._id !== undefined) {
      Service.updateOne({ _id: req.body._id }, [{
        $set: {
          "name": req.body.name,
          "posts":req.body.posts,
        }
      }])
      .then(re=>{        
        res.status(200).json({ mess: 'Thành công',status:true })
      })
      .catch(er=>{
        res.status(400).json({ mess: 'Thất bại',status:false })
      })
    }
    else {
      var now = new Date;
      var nowlc = new Date().toLocaleString();
      Service.create({
        name: req.body.name,
        posts:req.body.posts,
        created: now,
        createdlc: nowlc
      })
      .then(re=>{        
        res.status(200).json({ mess: 'Thành công',status:true })
      })
      .catch(er=>{
        res.status(400).json({ mess: 'Thất bại',status:false })
      })
    }
  })
  
module.exports = router;