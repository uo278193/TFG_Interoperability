const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        //Connection to DB
        this.dbConnect()

        this.middlewares()

        this.routes()
    }

    middlewares() {

        //CORS
        this.app.use( cors() )

        //read and parse body
        this.app.use( express.json() )
         
        //Public directory
        this.app.use( express.static('public') )
    }

    async dbConnect() {
        await dbConnection()  
    }
 
    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usersPath, require('../routes/user'))
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
      })
    }
}

module.exports = Server;
