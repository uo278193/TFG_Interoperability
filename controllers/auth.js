const { response, request } = require('express')
const bcriptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const User = require('../models/user')
const { generateJWT } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res = response) => {

    const { email, password } = req.body

    try {

        //Check if email exists
        const user = await User.findOne( {  email } )

        if(!user){
            return res.status(400).json({
                msg: "User / Email dont exist - email"
            })
        }

        //Check if user is currently active
        if (!user.state) {
            return res.status(400).json({
                msg: "User / Password dont exist - state:false"
            })
        }

        //Check password match
        const validPassword = bcriptjs.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                msg: "User / Password doesn´t exist - Password"
            })
        }


      

        //Generate JWT
        const token = await generateJWT(user.id)

        req.session.user = {
            email: user.email,
            token:token
        };
        res.render('personalinfo',{user:user.email,token:token})
        


    } catch(error) {
        console.log(error)
        return res.json({
            msg: "Talk with the App Admin"
        })

    }
}


const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Error al cerrar sesión" });
        }
        res.redirect('/'); // Redirige al inicio tras el logout
    });
};


const googleSignin = async (req, res = response) => {

    const { id_token } = req.body 
    console.log("En google signin")

    try {
        const googleUser = await googleVerify( id_token )

        const { name, email, picture: img } = googleUser

        //If user doesnt exist then create it   
        let user = await User.findOne({email})

        if( !user ) {
            const data = {
                name,
                email,
                img,
                google: true,
                password: ':P',
            }

            user = new User( data )
            await user.save()
        }

        // Check user state
        if ( !user.state ) {
            res.status(401).json({
                msg: "User blocked"
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id)
        req.session.user = {
            email: user.email,
            token:token
        };
        return res.status(200).json({
            success: true,
            token:token,
        });
    } catch (error) {
        res.status(400).json({
            msg: "Invalid google_token"
        })
    }

}

module.exports = {
    login,
    googleSignin,
    logout
}