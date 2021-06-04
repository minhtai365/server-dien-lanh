var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    img: { type: Array, required: true },
    name: { type: String, required: true },
    producer: { type: String },
    price: { type: Number},
    sale: { type: Number, required: true },
    detail: { type: String, required: true },
    view: { type: Number },
    catelogyid: {
        type: Schema.Types.ObjectId,
        ref: 'catelogies'
    },
    created: { type: Date },
    createdlc: { type: String, required: true },
});
module.exports = mongoose.model('product', productSchema);