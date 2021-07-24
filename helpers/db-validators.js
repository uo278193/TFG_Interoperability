const Role = require('../models/role')
const User = require('../models/user')
const Category = require('../models/category')
const Item = require('../models/item')

const isRoleOk = async (rol = '') => {

    const RoleExists = await Role.findOne({ rol })

    if (!RoleExists) {
        throw new Error(`Role ${ rol } is not difined`)
    }
}

const isEmailOk = async (email = '') => {
        
        //check if email exists
        const emailExists = await User.findOne({ email })

        // emailExists = false
        if ( emailExists ) {
            throw new Error(`email ${email} already exists`)
        }
}

const existsUserById = async (id) => {

    const userExists = await User.findById(id)

    if (!userExists) {
        throw new Error(`User Id ${ id } doesnt exist`)
    }
}

const existsCategoryById = async (id) => {

    const categoryExists = await Category.findById(id)

    if (!categoryExists) {
        throw new Error(`Categoty Id ${id} doesnt exist`)
    }

}

const existsItemById = async (id) => {

    const itemExists = await Item.findById( id )

    if (!itemExists) {
        throw new Error(`Item Id ${id} doesnt exist`)
    }
}

module.exports = {isRoleOk,
                    isEmailOk,
                    existsUserById,
                    existsCategoryById,
                    existsItemById
                }