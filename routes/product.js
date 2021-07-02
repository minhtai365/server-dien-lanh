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
router.get('/detail/:id', function (req, res, next) {
  // Product.find({ _id: req.params.id }).sort('-created').exec((err, dt) => {
  //   res.status(200).send(dt);
  // });
  Product.findByIdAndUpdate({ _id: req.params.id },
    { $inc: { view: + 1 } }).exec((err, ress) => {
      res.status(200).send(ress);
    })
  // .then(item => {
  //   console.log(item);
  //   res.status(200).send(item);
  // })
  // .catch(err => {
  //   res.send(err)
  // })
});
router.get('/home', async function (req, res, next) {
  await Product.aggregate([
    {
      $group: {
        _id: "$catelogyid",
        data: { $push: "$$ROOT" },
        //  totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
        //  averageQuantity: { $avg: "$quantity" },
        count: { $sum: 1 }
      },
    },
    // {
    //   $sort: { created: -1 },
    // },
    // {
    //   $limit: 1
    // },
    {
      $lookup: {
        from: "catelogies",
        localField: "_id",
        foreignField: "_id",
        as: "cate"
      },
    },
    {
      $project: {
        data: {
          $slice: ["$data", 0, 1],
        },
        name: "$cate.name"
      }
    },
    {
      $unwind: "$name"
    }
  ]
  ).then(async re => {
    let dt = {}
    await Product.find(async (err, pro) => {
      dt.topview = await pro.sort((a, b) => b.view - a.view).slice(0, 4);
    });
    dt.cateproduct = re;
    res.status(200).send(dt);
  })
})

router.post('/ofcate', async function (req, res, next) {
  Product.find({ catelogyid: req.body.id }).sort('-created').exec((err, dt) => {
    let start = req.body.current_page * req.body.start;
    let end = req.body.rows;
    res.status(200).send(dt.slice(start, end));
  });
});
router.post('/search', async function (req, res, next) {
  // db.users.find( { 'username' : { '$regex' : req.body.keyWord, '$options' : 'i' } } )
  Product.find({ 'name': new RegExp(req.body.search, "i") }).sort('-created').exec((err, dt) => {
    let start = req.body.current_page * req.body.start;
    let end = req.body.rows;
    if (dt.length !== 0) {
      res.status(200).send(dt.slice(start, end));
    }
    else {
      res.status(200).send(dt);
    }
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
router.get('/viewitem/:id', (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { $inc: { view: + 1 } }).exec((err,re)=>{
    res.status(200).json({ mess: 'Cập nhật lượt xem thành công', status: true });
  })
})
//end product///////////////////////////////////////////////////////
module.exports = router