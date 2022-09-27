const mongoose = require('mongoose');
const { Schema } = mongoose;

const charitySchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    fiveValue: {
        type: Number,
        default: 5
    },
    tenValue: {
        type: Number,
        default: 10
    },
    fifteenValue: {
        type: Number,
        default: 15
    },
    twentyValue: {
        type: Number,
        default: 20
    }

    });

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;
