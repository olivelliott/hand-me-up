const mongoose = require('mongoose');
const { Schema } = mongoose;

const charitySchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    // dollarValue: {
    //     type: NumberArr,
    //     default: 0
    // }
});

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;
