var express = require('express');
var multer = require('multer');
// import fs from 'fs';
var router = express.Router();

var Imgslide = require('../models/slide');


var upload = multer({ dest: './public/uploads/' })
//get type
router.get('/', (req, res, next) => {
  Imgslide.find((err, dt) => {
    res.send(dt)
  })
})
router.post('/status', (req, res, next) => {
  Imgslide.updateOne({ _id: req.body._id }, [
    {
      $set: {
        'status': req.body.status,
      }
    }
  ]) .then(re => {
    res.status(200).json({ mess: 'Thành công', status: true })
  })
  .catch(er => {
    res.status(400).json({ mess: 'Thất bại', status: false })
  })
})
//create types
router.post('/set', upload.single('slide'), (req, res, next) => {

  // console.log(req.file);
  // console.log('Ngoài');
  // const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
  //   let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
  //   orgName = orgName.trim().replace(/ /g, "-")
  //   const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
  //   // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
  //   const newFullPath = `${fullPathInServ}-${orgName}`;
  // fs.renameSync(fullPathInServ, newFullPath);
  console.log(req.body);
  // console.log(req.body.id=='undefined');

  if (req.body._id !== undefined) {
    Imgslide.updateOne({ _id: req.body._id }, [
      {
        $set: {
          'img': req.file.path.split('\\').slice(1).join('/'),
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
    var now = new Date;
    var nowlc = new Date().toLocaleString();
    Imgslide.create({
      img: req.file.path.split('\\').slice(1).join('/'),
      status:true,
      created: now,
      createdlc: nowlc
    })

      .then(re => {
        res.status(200).json({ mess: 'Thành công', status: true })
      })
      .catch(er => {
        res.status(400).json({ mess: 'Thất bại', status: false })
      })
  }
});
//end types
module.exports = router;