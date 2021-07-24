const { response } = require("express")
const { ObjectId } = require("mongoose").Types

const { Item, Category , User}  = require("../models")

const allowedCollections = [ 'category', 'item' ,'user' ,'role' ]

const lookforItems = async (term, res = response) => {

    const isMongoId = ObjectId.isValid(term)
    
    if (isMongoId){
        const item = await Item.findById(term)
        return res.json({
            results: (item) ? [item] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const queryStatements = {
        $or:[{description:regex}, {name:regex}],
        $and:[{status: true}]
    }

    const count = await Item.countDocuments(queryStatements)

    const items =  await Item.find(queryStatements)

    res.json({
        count,
        result: (items)? [items] : []
    })

}

const lookforCategories = async (term, res = response) => {

    const isMongoId = ObjectId.isValid(term)
    
    if (isMongoId){
        const category = await Category.findById(term)
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const queryStatements = {
            name:regex, 
            status: true
    }

    const count = await Category.countDocuments(queryStatements)

    const categories =  await Category.find(queryStatements)

    res.json({
        count,
        result: (categories)? [categories] : []
    })

}

const lookforUsers = async (term, res = response) => {

    const isMongoId = ObjectId.isValid(term)
    
    if (isMongoId){
        const user = await User.findById(term)
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(term, 'i')

    const queryStatements = {
        $or:[{email:regex}, {name:regex}],
        $and:[{state: true}]
    }

    const count = await User.countDocuments(queryStatements)

    const users =  await User.find(queryStatements)

    res.json({
        count,
        result: (users)? [users] : []
    })

}

const searchIntoCollection = async (req, res = response) => {
    
    const {collection, term} = req.params

    if ( !allowedCollections.includes(collection) ){
        return res.status(400).json({
            msg: `Collection doesnt allowed -> ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'item':
            lookforItems(term, res)
            break;
        case 'category':
            lookforCategories(term, res)
        break;
        case 'user':
            lookforUsers(term, res)
        break;
    
        default:
            break;
    }

}

module.exports = { searchIntoCollection }