const mongoose = require('mongoose')
const blog = require('../modals/Blog.modal')
const user = require('../modals/user.modal')
const fs = require('fs').promises;
const {asyncHandler} = require('../utils/asyncHandler.js')


const addBlog = asyncHandler( async function(req, res) {
      const { title, content } = req.body;
      const writing_user = req.user.email;
       
      const writer = await user.findOne({ email: writing_user }).select("-password");
         if(!writer){
          return res.json({status:404,message:"user not found"});
         }
      const imageUrl = req.files.map((file) => {
        return `http://localhost:8000/uploads/${file.filename}`;
      });

      const newBlog = await blog.create({
        title,
        content,
        userid: writer._id,
        writtenBy: writer.name,
        images: imageUrl,
      });

      res.json({ status: 200, message: "Blog added", blog: newBlog });
  })

const getBlogs = asyncHandler(async function (req,res) {
  
  const blogArray = await blog.find({});
    
  if(blogArray.length <= 0){return res.json({status:400})}

  return res.json({status:200,blogs:blogArray})

})

const ReadBlog = asyncHandler(async function (req,res) {
    const id = req.params.id;
    const blogData = await blog.findOne({_id:id});
    
    if(!blogData){return res.json({status:400})}
    return res.json({status:200,blog:blogData});
})

const deleteController = asyncHandler(async function(req,res) {

    const {id} = req.body;
    console.log(id);
    if(!id){return res.json({status:404,message:"id not found"})}

    const findBlog = await blog.findOne({_id:id});
    if(!findBlog){return res.json({status:404,message:"there is no blog with this id"})}

    const imgUrl = findBlog.images.map((val)=>{
     const filename = val.split('/').pop();
     return `uploads/${filename}`;
    })
       
    if(imgUrl.length>0){
        for(const path of imgUrl){
          try {
             await fs.unlink(path);
             console.log("file deleted",path)
          } catch (error) {
            if(error.code === 'ENOENT'){
              console.log("img is not found",path)
              return;
            }else{
              console.log("some thing went wrong in deleting the images",error)
            }
          }
        }
       }

   await blog.findByIdAndDelete({_id:id})
    
  res.json({status:201,message:"the blog is deleted successfully"})
    
})

const deletImageController =asyncHandler( async function(req,res) {
     const {_id,path} = req.body;
     const updateDatabase = await blog.findByIdAndUpdate(_id,{$pull:{images:path}},{new:true});
     if(!updateDatabase){return res.json({status:404,message:"something went wrong"})}    
     
     const fileName = path.split('/').pop();
      
     await fs.unlink(`uploads/${fileName}`);

     console.log("the file is deleted")
     return res.json({status:200,message:"something went wrong"});     
})

const updateController =asyncHandler(async function (req, res) {

    const { title, content, id } = req.body;
    const imgArray = req.files?.map(val => `http://localhost:8000/uploads/${val.filename}`) || [];
         
    if (!imgArray.length) {
      console.log("No new images uploaded");
    }

    const findBlog = await blog.findOne({_id:id})
    
   console.log("does it find the blog",findBlog)
    if (!findBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

   const updatedArray = [...findBlog.images, ...imgArray];

console.log('updtedarray',updatedArray);

const updateData = await blog.findByIdAndUpdate(
  {_id:id},
  {
    title,
    content,
    images:updatedArray, 
  },
  { new: true }
);

console.log(updateData);
  return  res.json({ status: 200, message: "Data updated successfully",updateData  });

})

module.exports = {addBlog,getBlogs,ReadBlog,deleteController,deletImageController,updateController}