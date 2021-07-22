const { response } = require("express")

const { Category } = require('../models')

const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();
        
        const categoryDB =  await Category.findOne({ name })

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
        
        return res.status(201).json(category)

} 

module.exports = {
    createCategory
}