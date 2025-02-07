const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    botId: {
        type: String,
        required: true
    },
    admins: {
        type: Array,
        required: false,
        default: []
    },
    
    loan: {type: Boolean, required: false, default: true},
    loantime: {type: Number, required: false, default: 60},
    loanamount: {type: Number, required: false, default: 100000},

    transactions: {type: Boolean, required: false, default: true},
    robbery: {type: Boolean, required: false, default: true},
    robberyPer: {type: Number, required: false, default: 0.5},

    channel: { type: String, required: false, default: ''},
    log: { type: String, required: false, default: ''},

    image: {type: Boolean, required: false, default: true},
    background: {type: String, required: false, default: ''},
    tcolor: {type: String, required: false, default: '#ffffff'},
    color1: {type: String, required: false, default: '#0A7F8B'},
    color2: {type: String, required: false, default: '#D9D9D9'},

    embed: {type: Boolean, required: false, default: false},
    ecolor: {type: String, required: false, default: '#ff0000'},

});

module.exports = mongoose.model('BankSettings', SettingsSchema);