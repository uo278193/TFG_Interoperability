const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


const validateJWT = async ( req = request, res = response, next ) => {
    
    const token = req.header('x-token')

    if( !token ) {
        return res.status(401).json({
            msg: 'Request has no token'
        })
    }

    try {

        const { uid }  = jwt.verify(token, process.env.SECRETANDPRIVATEKEY)

        const authUser = await User.findById( uid )

        //chaeck if user exists
        if( !authUser) {
            return res.status(401).json({
                msg: "Invalid Token - User doesn´t exists in DB"
            })
        }

        //check if authUser is active === state = true
        if( !authUser.state ) {
            return res.status(401).json({
                msg: "Invalid Token - User.state = false"
            })

        }
        req.authUser = authUser

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Invalid Token'
        })
    }

}
const validateJWTForViews = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (token) {
        try {
            const { uid } = jwt.verify(token, process.env.SECRETANDPRIVATEKEY);

            const authUser = await User.findById(uid);

            if (authUser && authUser.state) {
                console.log(authUser)
                res.locals.user = authUser; // Inyecta el usuario en res.locals para todas las vistas
            }
        } catch (error) {
            console.log('Token inválido o error:', error);
            res.locals.user = null;
        }
    }else{
        console.log("user null")
        res.locals.user = null;
    }

    next(); // No bloquear el acceso, solo inyectar el usuario si es válido
};

module.exports = { 
    validateJWT,
    validateJWTForViews 
}