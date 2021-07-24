const { response, request } = require('express')

const Item = require('../models/item')

const itemGet = async (req, res = response) => {

    const { id } = req.params

    const item = await Item.findById( id )
                            .populate('category')
                            .populate('user','email')

    res.json({
        item
    })
}

const itemsGet = async (req, res = response) => {

    const { desde = 0, limite = 10 } = req.body

    const queryStatements = {status: true }
    
    const [ total, items ] = await Promise.all([
        Item.countDocuments( queryStatements ),
        Item.find( queryStatements )
            .populate('category',['name'])
            .populate('user',['name', 'email'])
            .limit(Number(limite))
            .skip( Number(desde) )
    ]) 

    res.json({
        total,
        items
    })
}

const itemDelete = async (req, res = response) => {
    
    const { id } = req.params

    const updatedFields = {
        status: false,
        user: req.authUser._id
    }


    const itemDB = await Item.findByIdAndUpdate( id, updatedFields)

    res.json({
        itemDB
    })

}

const itemUpdate = async (req, res = response) => {

    const {id} = req.params

    const {...others } = req.body

    others.user = req.authUser._id

    const itemDB = await Item.findByIdAndUpdate( id, others )

    res.json({
        itemDB,
    })
}

const itemCreate = async (req, res = response) => {

    const name = req.body.name.toUpperCase()
    const description = req.body.description.toUpperCase()

    const itemDB = await Item.findOne({ name })
    
    if ( itemDB ) {
        return res.status(400).json({
            msg: `item ${ name } already exists`
        })
    }
    
    var data = req.body

    data.name = name
    data.description = description

    data.user = req.authUser._id

    const item = new Item( data )

    await item.save()
   
    return res.status(201).json(item)
   
}

module.exports = {
    itemsGet,
    itemGet,
    itemUpdate,
    itemDelete,
    itemCreate
}