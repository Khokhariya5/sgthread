const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InqSchema = new Schema({
    name: {type: String, required: true},
    mobile: {type: String, required: true},
    email:{type: String, required: true},
    desc: {type: String, required: true},
    inserted: {type: Date, default: Date.now}
});

var Inqmodel = mongoose.model('inquiries', InqSchema);

// Export the model
module.exports = Inqmodel;