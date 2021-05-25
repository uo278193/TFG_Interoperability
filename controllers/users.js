const { response, request } = require('express')

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

const usersPost = (req, res = response) => {

    const body = req.body

    res.json({
        message: 'post API - controller',
        status: 'cool',
        body
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