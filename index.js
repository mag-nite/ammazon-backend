// import statement 
const mongoose = require('mongoose')
const express = require("express");
const env = require("dotenv");
// const bodyparser = require('body-parser')
var cors = require('cors')
const app = express();

// routes
const userRoutes = require("./src/routes/auth")
const AdminRoutes = require("./src/routes/admin/auth")
const CategoryRoutes = require("./src/routes/category")
const ProductRoutes = require("./src/routes/product")
const CartRoutes = require("./src/routes/cart")

env.config();

app.use(express.json());
app.use(cors())
app.use('/api',userRoutes)
app.use('/api',AdminRoutes)
app.use('/api',CategoryRoutes)
app.use('/api',ProductRoutes)
app.use('/api',CartRoutes)

// mongo 
const mongoURI = process.env.MONGO_URL
mongoose.connect(mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then(()=>{
        console.log("Mongo is alive")
    })
   

app.listen(process.env.port, () => {
    console.log(`Ammazon running at ${process.env.port}`)
})

// git pull if there are changes 
require("child_process").exec("git pull https://github.com/Scronite/ammazon-backend master", (e, std)=> console.log(e || std))
//  test git pulls

