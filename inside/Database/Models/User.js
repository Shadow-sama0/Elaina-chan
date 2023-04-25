const { model, Schema } = require('mongoose')

const schema = new Schema({
    jid: {
        type: String,
        required: true,
        unique: true
    },

    experience: {
        type: Number,
        required: true,
        default: 0
    },

    ban: {
        type: Boolean,
        required: true,
        default: false
    },

    tag: String,

    level: {
        type: Number,
        required: true,
        default: 1
    },

    wallet: {
        type: Number,
        required: true,
        default: 4000
    },

    bank: {
        type: Number,
        required: true,
        default: 0
    },

    lastDaily: {
        type: Number,
        required: true,
        deafult: 0
    }
})

module.exports = model('userschema', schema)
