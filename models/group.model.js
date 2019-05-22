const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GroupSchema = new Schema({
    groupname: {type: String, required: true},
    image: {type: String, required: true},
    inserted: {type: Date, default: Date.now}
});

var Groupmodel = mongoose.model('groups', GroupSchema);

// Export the model
module.exports = Groupmodel;