var express = require('express');
var router = express.Router();
const Product = require('../models/product');
router.get('/all', function (req, res, next) {
    Product.find().sort('-created').exec((err, dt)=> {
      res.status(200).send(dt);
    });
  })
  router.post('/', function (req, res, next) {
    Product.find().sort('-created').exec((err, dt)=> {
        let data=dt;
        let start=req.body.start;
        let end=req.body.end;
      res.status(200).send(data.slice(start, end));
    });
  })
  router.post('/set', (req, res, next) => {
    if (req.body._id !== '') {
      Product.updateOne({ _id: req.body._id }, [
        {
          $set: {
            "name": req.body.name,
            "price": req.body.price,
            "sale": req.body.sale,
            "producer": req.body.producer,
            "img": req.body.img,
            "detail": req.body.detail,
            // "view": 0,
            "catelogyid": req.body.catelogyid,
          }
        }
      ])
      .then(re=>{        
        res.status(200).json({ mess: 'Thành công',status:true })
      })
      .catch(er=>{
        res.status(400).json({ mess: 'Thất bại',status:false })
      })
    } else {
      var now = new Date();
      var nowlc = new Date().toLocaleString();
      var pro = {
        name: req.body.name,
        price: req.body.price,
        sale: req.body.sale,
        producer: req.body.producer,
        img: req.body.img,
        catelogyid: req.body.catelogyid,
        detail: req.body.detail,
        view: 0,
        created: now,
        createdlc: nowlc
      }
      Product.create(pro)
      .then(re=>{        
        res.status(200).json({ mess: 'Thành công',status:true })
      })
      .catch(er=>{
        res.status(400).json({ mess: 'Thất bại',status:false })
      })
    }
  }
  )
  router.post('/viewitem', (req, res, next) => {
    Product.updateOne({ _id: req.body.id }, { $inc: { view: + 1 } })
      .then(item => {
        res.send(item);
      })
      .catch(err => {
        res.send(err)
      })
  })
  //end product///////////////////////////////////////////////////////
  module.exports=router