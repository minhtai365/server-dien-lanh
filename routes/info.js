var express = require('express');
var router = express.Router();
const info = require('../models/info');

router.get('/',(req,res,next)=>{
  info.find({},(err,dt)=>{
    res.send(dt)
  })
})
router.post('/set',(req,res,next)=>{
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.map);
  const {name,email,address,phone,logo,facebook,zalo,map,introduce,paypolicy,shippolicy,warrantypolicy}=req.body;
  info.find((err,dt)=>{
    if(dt.length!==0){
      console.log("123");
      console.log(dt);
      info.updateOne({},[
        {
          $set:{
            'name':name,
            'email':email,
            'address':address,
            'phone':phone,
            'logo':logo,
            'facebook':facebook,
            'zalo':zalo,
            'map':map,
            'introduce':introduce,
            'paypolicy':paypolicy,
            'shippolicy':shippolicy,
            'warrantypolicy':warrantypolicy
          }
        }]
      )
      .then(re=>{        
        res.status(200).json({ mess: 'Thành công',status:true })
      })
      .catch(er=>{
        // res.status(400).json({ mess: 'Thất bại',status:false })
      })
    }
    else{
      
      console.log("321");
      var inf={
            name:name,
            email:email,
            address:address,
            phone:phone,
            logo:logo,
            facebook:facebook,
            zalo:zalo,
            map:map,
            introduce:introduce,
            paypolicy:paypolicy,
            shippolicy:shippolicy,
            warrantypolicy:warrantypolicy
      }
      info.create(inf)
      .then(re=>{        
        res.status(200).json({ mess: 'Thành công',status:true })
      })
      .catch(er=>{
        
      
      console.log("888");
        // res.status(400).json({ mess: 'Thất bại',status:false })
      })
    }
  })
  
})
module.exports = router;
