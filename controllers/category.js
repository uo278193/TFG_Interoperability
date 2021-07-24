const { response } = require("express")

const { Category } = require('../models')


const categoriesGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const queryStatements = { status: true }

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( queryStatements ),
        Category.find( queryStatements )
            .limit( Number(limite) )
            .skip( Number(desde) )
    ])

    res.json({
        total,
        categories
    })
}

const categoryGet = async (req, res = response) => {

    const { id } = req.params

    const category = await Category.findById(id)
                                   .populate('user')

    res.json({
        category
    })

}

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

const categoryPut = async (req, res = response ) => {
    
    const { id } = req.params

    const { ...others } = req.body

    const categoryDB = await Category.findByIdAndUpdate( id, others)

    res.json({
        categoryDB
    })
}

const categoryDelete = async (req, res = response ) => {
    
    const { id } = req.params

    const updatedFields = {
        status: false,
        user: req.authUser._id
    }


    const categoryDB = await Category.findByIdAndUpdate( id, updatedFields)

    res.json({
        categoryDB
    })
}

module.exports = {
    categoriesGet,
    categoryGet,
    createCategory,
    categoryPut,
    categoryDelete
}