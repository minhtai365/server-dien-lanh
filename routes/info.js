
var multer = require('multer');
var express = require('express');
var router = express.Router();
const Info = require('../models/info');

var upload = multer({ dest: './public/uploads/' })
router.get('/', (req, res, next) => {
  Info.find({}, (err, dt) => {
    res.send(dt)
  })
})
router.post('/set', upload.single('logo'), (req, res, next) => {
  // console.log(req.body.info);
  let info = JSON.parse(req.body.info)
  console.log(info);

  console.log(req.file);

  const { name, email, address, phone, facebook, zalo, tiktok, gps, introduce, paypolicy, shippolicy, warrantypolicy } = info;
  if (req.file == undefined) {
    Info.find((err, dt) => {
      // console.log(gbs);
      if (dt.length !== 0) {
        Info.updateOne({ _id: info._id }, [
          {
            $set: {
              'name': name,
              'email': email,
              'address': address,
              'phone': phone,
              'facebook': facebook,
              'zalo': zalo,
              'tiktok': tiktok,
              'gps': gps,
              'introduce': introduce,
              'paypolicy': paypolicy,
              'shippolicy': shippolicy,
              'warrantypolicy': warrantypolicy
            }
          }]
        )
          .then(re => {
            res.status(200).json({ mess: 'Thành công', status: true })
          })
          .catch(er => {
            console.log(er);
            res.status(400).json({ mess: 'Thất bại', status: false })
          })
      }
      else {
        console.log("321");
        var inf = {
          name: name,
          email: email,
          address: address,
          phone: phone,
          facebook: facebook,
          zalo: zalo,
          tiktok: tiktok,
          gps: gps,
          introduce: introduce,
          paypolicy: paypolicy,
          shippolicy: shippolicy,
          warrantypolicy: warrantypolicy
        }
        Info.create(inf)
          .then(re => {
            res.status(200).json({ mess: 'Thành công', status: true })
          })
          .catch(er => {


            console.log("888");
            // res.status(400).json({ mess: 'Thất bại',status:false })
          })
      }
    })
  }
  else {
    Info.find((err, dt) => {
      // console.log(gbs);
      if (dt.length !== 0) {
        Info.updateOne({ _id: info._id }, [
          {
            $set: {
              'name': name,
              'email': email,
              'address': address,
              'phone': phone,
              'logo': req.file.path.split('\\').slice(1).join('/'),
              'facebook': facebook,
              'zalo': zalo,
              'tiktok': tiktok,
              'gps': gps,
              'introduce': introduce,
              'paypolicy': paypolicy,
              'shippolicy': shippolicy,
              'warrantypolicy': warrantypolicy
            }
          }]
        )
          .then(re => {
            res.status(200).json({ mess: 'Thành công', status: true })
          })
          .catch(er => {
            console.log(er);
            res.status(400).json({ mess: 'Thất bại', status: false })
          })
      }
      else {
        console.log("321");
        var inf = {
          name: name,
          email: email,
          address: address,
          phone: phone,
          logo: req.file.path.split('\\').slice(1).join('/'),
          facebook: facebook,
          zalo: zalo,
          tiktok: tiktok,
          gps: gps,
          introduce: introduce,
          paypolicy: paypolicy,
          shippolicy: shippolicy,
          warrantypolicy: warrantypolicy
        }
        Info.create(inf)
          .then(re => {
            res.status(200).json({ mess: 'Thành công', status: true })
          })
          .catch(er => {


            console.log("888");
            // res.status(400).json({ mess: 'Thất bại',status:false })
          })
      }
    })
  }
})
module.exports = router;
