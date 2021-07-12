const mongoose = require('mongoose');


const dbConnection = async() => {
    
try{  

    await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("database conectada ✌️")

    } catch(error) {
        console.log(error)
        throw new Error("Cannot connect to db 🤯")
    }
}

module.exports = {dbConnection}