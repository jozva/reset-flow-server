const express = require("express")
const app = express()
const cors = require("cors")

const connectDB = require ("./src/utils/db")
const userRoute = require("./src/routes/userRoute")

app.use(express.json())
app.use (cors({
    origin:"*"
}))


app.use("/user",userRoute)


connectDB();

app.listen(8000)