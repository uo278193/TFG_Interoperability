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

CategorySchema.methods.toJSON = function(){
    const { __v, _id, ...category } = this.toObject()
    category.cid = _id
    return category
}

module.exports = model( 'Category',CategorySchema )