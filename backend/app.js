const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const authRouter = require('./router/Auth.router')
const connection = require("./config/connections")
const blogRouter = require("./router/blogRouter")
const path  = require('path')
require('dotenv').config()
const cors = require('cors')
const port = process.env.port || 4000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



connection();

app.use('/api/user',authRouter)
app.use('/api/blog',blogRouter)

app.listen(port,()=>{
  console.log("server is running at port :",port)
})