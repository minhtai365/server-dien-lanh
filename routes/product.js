var express = require('express');

const { cloudinary } = require('../cdn/cloudinary');

var router = express.Router();
const Product = require('../models/product');
const Cate = require('../models/catelogie');
router.get('/all', function (req, res, next) {
  Product.find().sort('-created').exec((err, dt) => {
    res.status(200).send(dt);
  });
});
router.get('/home', async function (req, res, next) {
  let arr = [];

  await Cate.find().sort('-created').exec(async (err, cate) => {
    await cate.forEach(async (item, i) => {
      await Product.find().exec(async (err, pro) => {
        
        let obj ={};
        obj.name=item.name;
        obj.data=pro.filter(p => p.catelogyid == item._id);
        arr[i] = obj;
        if (i === cate.length - 1) {
          let viewTop = pro.sort((a,b)=>b.view-a.view).slice(0,4);
          let dt ={};
          dt.cateproduct = arr;
          dt.topview =viewTop
          res.status(200).send(dt);
        }
      })
    })
  });
});
router.post('/', async function (req, res, next) {
  Product.find().sort('-created').exec((err, dt) => {
    let data = dt;
    let start = req.body.start;
    let end = req.body.end;
    res.status(200).send(data.slice(start, end));
  });
});
router.post('/set', async (req, res, next) => {
  let arrUpload = [];
  try {
    const fileArr = req.body.files;
    await fileArr.forEach(async (fileStr, index) => {

      if (fileStr.indexOf('res.cloudinary.com') !== -1) {
        arrUpload.push(fileStr);
      }
      else {
        const uploadRes = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'dev_dienlanh'
        });
        await arrUpload.push(uploadRes.url);
      }
      if (index === fileArr.length - 1) {
        if (req.body._id !== undefined) {
          await Product.updateOne({ _id: req.body._id }, [
            {
              $set: {
                "name": req.body.name,
                "price": req.body.price,
                "img": arrUpload,
                "post": req.body.post,
                // "view": 0,
                "catelogyid": req.body.catelogyid,
              }
            }
          ])
            .then(re => {
              res.status(200).json({ mess: 'Thành công', status: true })
            })
            .catch(er => {
              res.status(400).json({ mess: 'Thất bại', status: false })
            })
        }
        else {
          var now = new Date();
          var nowlc = new Date().toLocaleString();
          var pro = {
            name: req.body.name,
            price: req.body.price,
            img: arrUpload,
            catelogyid: req.body.catelogyid,
            post: req.body.post,
            view: 30,
            created: now,
            createdlc: nowlc
          }
          Product.create(pro)
            .then(re => {
              res.status(200).json({ mess: 'Thành công', status: true })
            })
            .catch(er => {
              res.status(400).json({ mess: 'Thất bại', status: false })
            })
        }
      }
    });
  }
  catch (err) {
    console.error(err);
  }
});
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
module.exports = router