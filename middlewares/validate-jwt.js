const { request, response } = require('express')

const jwt = require('jsonwebtoken')

const validateJWT = ( req = request, res = response, next ) => {
    
    const token = req.header('x-token')

    if( !token ) {
        return res.status(401).json({
            msg: 'Request has no token'
        })
    }

    try {

        const { uid}  = jwt.verify(token, process.env.SECRETANDPRIVATEKEY)

        req.uid = uid

        next()

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: 'Invalid Token'
        })
    }

    
    next()
}

module.exports = { 
    validateJWT 
}