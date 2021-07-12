const { response, request } = require('express')
const bcryptjs =  require('bcryptjs')
const User = require('../models/user')

const usersGet = (req = request, res = response) => {

    const {id= 1, limit = 10, name = "no name"} = req.query

    res.json({
        message: 'get API - controller',
        status: 'cool! 👍',
        id,
        limit,
        name,
    })
  }

const usersPut = (req = request, res = response) => {

    const { id } = req.params

    res.json({
        message: 'put API - controller',
        status: 'cool',
        id
    })
}

const usersPost = async (req, res = response) => {

    const { name, password, role, email } = req.body
    const user = new User( {name, password, role, email} )

    //check if email exists
    const emailExists = await User.findOne({ email })
   // emailExists = false
    
    
    if ( emailExists ) {
        return res.status(400).json({
            msg: "email already exists"
        })
    }

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //save user
    await user.save()

    res.json({
        message: 'post API - controller',
        status: 'cool',
        user
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        message: 'patch API - controller',
        status: 'cool'
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        message: 'delete API - controller',
        status: 'cool'
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
}