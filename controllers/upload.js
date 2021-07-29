const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL)

const { response } = require("express")
const { loadFile } = require('../helpers')

const { User, Item } = require('../models')

const uploadFile = async ( req, res = response ) => {
    
    try{
        const fileName = await loadFile(req.files.archivo)

        res.json({ fileName })

    } catch(err) {
        return res.status(400).json({err})
    }

}

const updateFile = async (req, res = response) => {

    const { collection, id } = req.params 

    let model = null
    
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if( !model ) {
                return res.status(400).json({ msg: `user ${id} doesn´t exists`})
            }
            break
        
        case 'items':
            model = await Item.findById(id)
            if( !model ) {
                return res.status(400).json({ msg: `item ${id} doesn´t exists`})
            }
            break
    
        default:
            return res.status(500).json({ msg: "collection not validated"})
    }

    //delete file
    if (model.img) {

        const imgPath = path.join(__dirname,'../uploads',collection,model.img)

        if ( fs.existsSync( imgPath ) ) {
            fs.unlinkSync( imgPath );
        }
    }
   //put file
    const imgName = await loadFile(req.files.archivo, undefined, collection)

    model.img = imgName

    await model.save()

    res.status(200).json({
        model
      })
}

const getFile = async (req, res = response) => {

    const { collection, id } = req.params 

    let model = null
    
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if( !model ) {
                return res.status(400).json({ msg: `user ${id} doesn´t exists`})
            }
            break
        
        case 'items':
            model = await Item.findById(id)
            if( !model ) {
                return res.status(400).json({ msg: `item ${id} doesn´t exists`})
            }
            break
    
        default:
            return res.status(500).json({ msg: "collection not validated"})
    }
    if (model.img) {
        const imgPath = path.join(__dirname,'../uploads', collection, model.img)
        
        if ( fs.existsSync( imgPath ) ) {
            console.log(imgPath,)
            return res.sendFile( imgPath )
        }
    }
    const noImgPath = path.join(__dirname,'../assets', 'no-image.jpg')
    return res.sendFile( noImgPath )
}

//CLOUDINARY
const updateFileCloudinary = async (req, res = response) => {

    const { collection, id } = req.params 

    let model = null
    
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if( !model ) {
                return res.status(400).json({ msg: `user ${id} doesn´t exists`})
            }
            break
        
        case 'items':
            model = await Item.findById(id)
            if( !model ) {
                return res.status(400).json({ msg: `item ${id} doesn´t exists`})
            }
            break
    
        default:
            return res.status(500).json({ msg: "collection not validated"})
    }

    //delete file CLOUDINARY
    if (model.img) {
        const nameArr = model.img.split('/')
        const name = nameArr[ nameArr.length - 1] 
        const [ publicId ] = name.split('.')

        cloudinary.uploader.destroy(publicId)

    }
   //put file in CLOUDINARY
    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
    model.img = secure_url

    await model.save()

    res.status(200).json({
        model
      })
}


module.exports = {
    uploadFile,
    updateFile,
    getFile,
    updateFileCloudinary
} 