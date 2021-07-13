const { Schema, model } = require('mongoose')

const roleSchema = Schema({
    role: {
        type: String,
        require: [true,'role is mandatory']
    }
})

module.exports = model('role',roleSchema)