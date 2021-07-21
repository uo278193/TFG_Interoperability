const { response } = require("express");
const { Category } = require('../models')

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    try{

        const categoryDB = await Category.findOne({ name })

        if ( categoryDB ) {
            return res.status(400).json({
                msg: `category ${ categoryDB.name } already exists`
            })
        }

        const data = {
            name,
            user: req.authUser._id
        }

        const category = new Category( data )

        await category.save()
        res.status(201).json(category)

    } catch(error) {
        console.log(error)
        return res.json({
            msg: "Talk with the App Admin"
        })

    }

} 

module.exports = {
    createCategory
}