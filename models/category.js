const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true,'Name is mandatory']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

})

module.exports = model( 'Category',CategorySchema )