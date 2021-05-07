const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var promotionSchema=new Schema({
    name:{type:String,required:true},
    content:{type:String,required:true},
    created:{type:Date,required:true},
    createdlc:{type:String,required:true},
})
module.exports=mongoose.model('promotion',promotionSchema);