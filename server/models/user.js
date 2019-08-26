const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,

    },
    email: String,
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

schema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('User', schema);