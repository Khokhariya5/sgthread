const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title: {type: String, required: true},
    price: {type: String, required: true},
    unit: {type: String, required: true},
    min_qty: {type: String, required: true},
    group: {type: String, required: true},
    image: {type: Array, required: true},
    desc: {type: String, required: true},
    inserted: {type: Date, default: Date.now}
});

var Productmodel = mongoose.model('products', ProductSchema);

// Export the model
module.exports = Productmodel;
