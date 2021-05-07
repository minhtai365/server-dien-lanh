var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var infoSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,},
    phone:{type:String,required:true},
    logo:{type:String,},
    facebook:{type:String},
    zalo:{type:String},
    map:{type:String},
    introduce:{type:String},
    paypolicy:{type:String,},
    shippolicy:{type:String,},
    warrantypolicy:{type:String,},
})
module.exports=mongoose.model('info',infoSchema);