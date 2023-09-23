const jwt = require('jsonwebtoken')
const middleWare = (req, res, next) => {
    try {
        //acess token from headers
        const token = req.headers['access-token']
        if(!token){
            return res.status(401).json({
                status: false,
                message: "Token is missing, please login",
                statusCode: 401,
            });
        }
        //true/false(router contiue only if true)
        jwt.verify(token, "spidey")
        //to continue middleware
        next()
    }
    catch {
        res.status(401).json({
            status: false,          
            message: "please login",
            statusCode: 401,

        })
    }
}       

module.exports={middleWare}