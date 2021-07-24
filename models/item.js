const { Schema, model } = require('mongoose')

const ItemSchema = Schema({
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
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: [true,'description is mandatory']
    },
    salesPrice: {
        type: Number,
        default: 0
    },
    available:{
        type:Boolean,
        default:true
    }

})

ItemSchema.methods.toJSON = function(){
    const { __v, _id, status, ...item } = this.toObject()
    item.iid = _id
    return item
}

module.exports = model( 'Item',ItemSchema )