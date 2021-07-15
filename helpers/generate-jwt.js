const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {
    return new Promise( (resolve, reject) => {

        const payload = { uid }
    
        jwt.sign(payload, process.env.SECRETANDPRIVATEKEY,{
            expiresIn: '4h'
        }, (err, token ) => {
            
            if ( err ) {
                console.log(err)
                reject( 'Cannot generate a Token')
            } else {
                resolve( token );
            }
        })

    })
}

module.exports = { generateJWT }