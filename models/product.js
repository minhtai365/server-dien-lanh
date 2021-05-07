var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productSchema=new Schema({
    img:{type:String,required:true},
    name:{type:String,required:true},
    producer:{type:String},
    price:{type:String,required:true},
    sale:{type:String},
    detail:{type:Number,required:true},
    view:{type:Number},
    catelogyid:{
        type : Schema.Types.ObjectId,
        ref:'catelogie'
    },
    created:{type:Date},
    createdlc:{type:String,required:true},
});
module.exports=mongoose.model('Product',productSchema);