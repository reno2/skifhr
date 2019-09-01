const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
    },
    amount: {
        type: Number
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        default: 'standart',
        enum: ['family', 'ddu', 'crime']
    }

}, {
    timestamps: true
});

schema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Transactions', schema);