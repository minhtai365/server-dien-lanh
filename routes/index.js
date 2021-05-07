var express = require('express');
var router = express.Router();
//connect database
// const mongoose = require('mongoose');
var Product = require('../models/product');
var Service = require('../models/service');
var Catelogies = require('../models/catelogie');
var Imgslide = require('../models/slide');
var Promotion = require('../models/promotion');

//xóa Service
router.post('/item', (req, res, next) => {
console.log(req.body);
  const id = req.body._id;
  console.log(id);
  Service.deleteOne({ _id: id })
  .then(re=>{        
    res.status(200).json({ mess: 'Thành công',status:true })
  })
    .catch(
      //xóa catelogies
      Catelogies.deleteOne({ _id: id })
        .then(resp => {
          deletePro(id);
          res.status(200).json({ mess: 'Thành công',status:true })
        })
        .catch(err => {
          deletePro(id);
          deleteImg(id);
          deletePromotion(id);
        }
        )
    )
})
//Xóa product
function deletePro(id) {
  Product.deleteOne({ _id: id })
    .then(resp => {
          res.status(200).json({ mess: 'Thành công',status:true })
    })
    Product.deleteMany({ catelogyid: id })
    .then(resp => {
          res.status(200).json({ mess: 'Thành công',status:true })
    })
}
//Xóa slide
function deleteImg(id) {
  Imgslide.deleteOne({ _id: id })
    .then(resp => {
          res.status(200).json({ mess: 'Thành công',status:true })
    })
}//Xóa Khuyến mãi
function deletePromotion(id) {
  Promotion.deleteOne({ _id: id })
    .then(resp => {
          res.status(200).json({ mess: 'Thành công',status:true })
    })
}
module.exports = router;

// var MogoCl=require('mongodb').MongoClient;
// var url="mongodb://localhost:27017/";
// MogoCl.connect(url,function(err,db){
//   if(err) throw err;
//   var dt=db.db("my-database");
//   dt.collection("user").findOne({roleid:"1"},function(err,res){
//     if(err) throw err;
//     console.log(res.username);
//     dt.close();
//   })
// })
