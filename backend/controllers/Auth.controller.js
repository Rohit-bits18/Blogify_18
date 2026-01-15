const user = require('../modals/user.modal')
const jwt = require('jsonwebtoken')
const blog = require('../modals/Blog.modal')
const {asyncHandler} = require('../utils/asyncHandler.js')

const registrationController = asyncHandler(async function (req,res) {

  const{name,phone,email,password} = req.body.data;
    console.log(req.body.data)
  const isExist = await user.findOne({email:email})
  
  if(isExist){return res.json({status:200,message:"user is already registered"})}
  
  const addUser = await user({name:name,phone:phone,email:email,password:password})
  await addUser.save();

  if(!addUser){return res.json({status:400,message:"something went wrong"})}

  return res.json({status:201,message:"user is successfully registered,",addUser});
 
})


const loginController = asyncHandler(async function (req,res) {

  const{email,password} = req.body.data;

  console.log(req.body.data)
  const isExist = await user.findOne({email:email})
  
  if(!isExist){return res.json({status:404,message:"you need to register frist"})}
  
  const decode = await isExist.decodePassword(password);
   console.log('the docoded answer',decode)
  if(!decode){return res.json({status:404,message:"your entered password is not match with registered one"})}

  const token = isExist.jwtGenerate();
  res.cookie('token',token);
  return res.json({status:201,message:"user is logged in"});

})

const isLogin = asyncHandler(function (req,res,next) {

    const token = req.cookies?.token;
    if(!token){return res.json({status:404,message:"you need to register frist"})}
     const decode = jwt.verify(token,process.env.secretKey);
     req.user = decode;
    // console.log(req.user)
     next();
})


const profileController = asyncHandler(async function (req,res){

    const userData = req?.user;
      isExist = await user.findOne({email:userData.email});
   // console.log("the user  data is ",isExist);
   
    if(!userData){return res.json({status:404,message:"token is missing"})}
      
    const blogList = await blog.find({userid:isExist._id});
        // console.log("the user  data is ",blogList);
   return res.json({status:201,userData,blogList});
    
})

function logoutController(req,res) {
  try {
    res.cookie('token','');
     res.json({status:200,message:"user logout successfully"});
     return;
  } catch (error) {
    console.log("there is an error in the logout Controller",error);
  }
}

module.exports = {registrationController,loginController,isLogin,profileController,logoutController}