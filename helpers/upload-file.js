const { v4: uuidv4 } = require('uuid')
const path = require('path')

const loadFile = async (file, fileExtensions = ['jpg','pdf'], folder = '') => {
    
    return new Promise( (resolve, reject) => {

        const { name } = file
        const nameSplited = name.split(".")
        const extension = nameSplited[nameSplited.length - 1]

        if( !fileExtensions.includes(extension)) {
            return reject(`Error extension: ${ extension } is not allowed -> ${ fileExtensions }`)
        }

        const fileName = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', folder, fileName)

        file.mv( uploadPath, (err) => {
            if (err) {
                 reject(err)
            }
            
            resolve(fileName)
        })
    })
}

module.exports = { loadFile }
