const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    category: {type: String, required: true},
    groupnames: {type: Array, required: true},
    inserted: {type: Date, default: Date.now},
});

var Categorymodel = mongoose.model('categories', CategorySchema);

// Export the model
module.exports = Categorymodel;