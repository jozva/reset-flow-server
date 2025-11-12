const mongoose = require("mongoose")

const user_sche = new mongoose.Schema ({
    username: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type :String ,
        required : true
    },
    otp : {
       type :String , 
    }
},{
    versionKey : false
})
const User = mongoose.model("User",user_sche)

module.exports = User ;