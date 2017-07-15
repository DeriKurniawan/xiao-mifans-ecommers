const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    pict: { type: String, required: true },
    procesor: { type: String, required: true },
    camera: { type: String, required: true },
    waranti: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, required: true },
    promotion: { type: Number, required: true }
}, { timestamps: true });

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;