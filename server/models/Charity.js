const mongoose = require('mongoose');
const { Schema } = mongoose;

const charitySchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
});

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;
