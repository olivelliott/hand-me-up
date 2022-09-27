const mongoose = require('mongoose');
const { Schema } = mongoose;

const donationSchema = new Schema ({
    dollarValue: {
        type: Number,
        default: 5
    },
 });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
