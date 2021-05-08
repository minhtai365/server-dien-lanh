var express = require('express');
var router = express.Router();

var Imgslide = require('../models/slide');

//get type
router.get('/', (req, res, next) => {
    Imgslide.find((err, dt) => {
      res.send(dt)
    })
  })
  //create types
  router.post('/set', (req, res, next) => {
    if (req.body._id !== undefined) {
      Imgslide.updateOne({ _id: req.body._id }, [
        {
          $set: {
            'img': req.body.img
          }
        }
      ])
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
      Imgslide.create({
        img: req.body.img,
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
  });
  //end types
module.exports = router;