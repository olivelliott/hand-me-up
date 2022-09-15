const mongoose = require('mongoose');
const { Schema } = mongoose;

const charitySchema = new Schema ({});

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;
