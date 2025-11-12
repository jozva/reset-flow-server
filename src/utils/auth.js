const User = require("../models/user")
const jwt = require("jsonwebtoken")
const authenticate = async (req, res, next) => {
    // const authorizationHeaders = req.headers.authorization
    
    // const decode = jwt.verify(authorizationHeaders,process.env.JWT)
    // if (!decode) {
    //     return res.status(400).json({Message:"No authorized"})
    // }
    try {
        const email = req.body.email
        const user = await User.findOne({email})
        const otp  =user.otp
        if (!otp) {
           res.status(400).json({message:"not authorised" , code:400})
        }
        next()
    } catch (error) {
        console.log(error)
    }

}

module.exports = authenticate;