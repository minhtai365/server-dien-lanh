var express = require('express');
var router = express.Router();

var User = require('../models/user');
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.post('/login', function (req, res, next) {
  User.findOne((err, dt) => {
    if (!dt) {
      var now = new Date;
      var nowlc = new Date().toLocaleString();
      User.create({
        email: 'admin',
        password: '1',
        created: now,
        createdlc: nowlc
      })
    }
    else
      if (dt.email === req.body.email && dt.password === req.body.password) {
        var token = jwt.sign({_id:dt._id}, process.env.SECRET_JWT);
        res.status(200).json({ mess: 'Đăng nhập thành công', status: true, token: token })
      } else {
        res.status(200).json({ mess: 'Đăng nhập thất bại', status: false })
      }
    // res.send(dt);
  })
  // User.deleteOne({ _id: '60f1af729129a931a05311f4' }) .then(re => {
  //   // res.status(200).json({ mess: 'Thành công', status: true })
  //   console.log(re);
  // }).catch(err=>{
  //   console.log(err);
  // })
});

module.exports = router;
