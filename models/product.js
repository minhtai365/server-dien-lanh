var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    img: { type: Array, required: true },
    name: { type: String, required: true },
    price: { type: Number},
    post: { type: String, required: true },
    view: { type: Number },
    catelogyid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catelogies'
    },
    created: { type: Date },
    createdlc: { type: String, required: true },
});
module.exports = mongoose.model('product', productSchema);