const express = require('express');
const {isLogin} = require('../controllers/Auth.controller');
const {getBlogs, 
  ReadBlog,
  deleteController, 
  deletImageController,
   updateController, 
   addBlog } = require('../controllers/Blog.controller');

const router = express.Router();
const upload = require('../controllers/fileUploadController');


router.post('/addblog',isLogin,upload.array('image',5),addBlog);

router.get('/home',getBlogs)
router.get('/readblog/:id',ReadBlog);
router.delete('/deleteblog',deleteController)
router.delete('/deleteimage',deletImageController)
router.post('/update',upload.array('image',5) ,updateController);





module.exports = router