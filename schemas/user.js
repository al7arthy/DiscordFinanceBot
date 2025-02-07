const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const Schema = mongoose.Schema;

const MarriageSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    }
}, { _id: false });

const UserSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    botId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    credits: {
        type: require('mongoose-bignumber'),
        default: 0
    },
    stolen: {
        type: require('mongoose-bignumber'),
        required: false,
        default: 0
    },
    blacklisted: { type: String, required: false, default: false },
    loan: {
        type: Boolean,
        default: false
    },
    married: {
        type: String,
        default: null
    },
    marriages: {
        type: [MarriageSchema],
        default: []
    }
});

module.exports = mongoose.model('BankUser', UserSchema);