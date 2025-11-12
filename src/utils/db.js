const mongoose = require("mongoose")
const dotenv = require ("dotenv").config()


const connectDB = async () => {
try {
    const connect = await mongoose.connect(process.env.DB)
    if(connect){
       return console.log("DB connected")
    }
} catch (error) {
    console.log(error)
}
}


module.exports = connectDB ;