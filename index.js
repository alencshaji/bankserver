//import cors for integration
const cors = require('cors')
// import .env
require('dotenv').config()
// imporrt express  // /import route
const express = require("express")
const router = require('./routes/router')

// create server using express
const server = express()
//use cors after import
server.use(cors())
// covert all json to js data
server.use(express.json())

//router set
server.use(router)

//  import connection .js file
require('./database/connection')

// port // run env file or call in same file or port
const port = 5001 || process.env.PORT
server.listen(port,()=>{
    console.log(`Port working - ${port}`);
})


// api call resolve post
// server.post('/register',(req,res)=>{
//     console.log(req.body.acno);
//     res.send("post working")
// })