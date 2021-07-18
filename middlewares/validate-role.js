const { response } = require("express")

const isAdminRole = ( req, res = response, next ) => {

    const {role, name} = req.authUser

    if (!req.authUser) {
        res.status(500).json({
            msg: "Token has not been validated"
        })
    }
    
    if ( role !== 'ADMIN_ROLE' ) {
        res.status(401).json({
            msg: `${name} has not administrator permission`
        })
    }

    next()

}

const isARightRole = (...roles) => {
    return (req, res, next) => {

        if (!req.authUser) {
            res.status(500).json({
                msg: "Token has not been validated"
            })
        }

        if( !roles.includes(req.authUser.role)) {
            return res.status(401).json({
                msg: `User has not an awared role ${roles}`
            })
        }

        next()

    }
}

module.exports = {
    isAdminRole,
    isARightRole
}