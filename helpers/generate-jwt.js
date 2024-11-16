const jwt = require('jsonwebtoken')
const SECRET_PRIVATE = process.env.SECRETANDPRIVATEKEY


const generateJWT = (uid = '') => {
    return new Promise( (resolve, reject) => {

        const payload = { uid }
       
    
        jwt.sign(payload, SECRET_PRIVATE,{
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