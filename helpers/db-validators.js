const Role = require('../models/role')
const User = require('../models/user')

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
        throw new Error(`Id ${ id } dont exist`)
    }
}

module.exports = {isRoleOk,
                    isEmailOk,
                    existsUserById}