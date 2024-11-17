const { response, request } = require('express')




const index = async (req = request, res = response) => {
try{
    res.render('index')
}catch{
    console.log(error)
    return res.json({
        msg: "Talk with the App Admin"
    })
}
    
}


module.exports = {
    index
}