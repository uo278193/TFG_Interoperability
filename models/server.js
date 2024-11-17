const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            index: '/',
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            items: '/api/items',
            searchs: '/api/searches',
            upload: '/api/upload'
        }
 
        //Connection to DB
        this.dbConnect()

        this.middlewares()

        this.routes()
    }

    middlewares() {

        this.app.set('view engine','ejs')
        this.app.set('views', './public');

        this.app.use((req, res, next) => {
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            next();
          });

        //Supuestamente para enviart datos de formularios al backend
        this.app.use(express.urlencoded({ extended: true }));
        
        //CORS
        this.app.use( cors() )

        //read and parse body
        this.app.use( express.json() )
         
        //Public directory
        this.app.use( express.static('public') )

        //Upload files
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))
    }

    async dbConnect() {
        await dbConnection()  
    }
 
    routes() {
        this.app.use(this.paths.index,require('../routes/index') )
        this.app.use( this.paths.auth, require('../routes/auth') )
        this.app.use( this.paths.users, require('../routes/user') )
        this.app.use( this.paths.categories, require('../routes/categories') )
        this.app.use( this.paths.items, require('../routes/item') )
        this.app.use( this.paths.searchs, require('../routes/search') )
        this.app.use( this.paths.upload, require('../routes/upload') )
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
      })
    }
}

module.exports = Server;
