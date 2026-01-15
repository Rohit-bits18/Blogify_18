import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
// import '../style/Home.css'
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';
function Landing() {
const [blogs,setBlogs] = useState([]);
const navi = useNavigate();

    async function callApi() {
        try{
            const res = await axios.get("/api/blog/home");

            console.log(res.data)
      	if(res.data.status == 404){
                  window.alert("something went wrong")
									return;
						}

            setBlogs(res.data.blogs)
				


       return;

      } catch (error) {
    console.log("there is an error in reg component api calling")
   } 
    }

    useEffect(()=>{
      callApi();
    },[])

    const handleBlog = async function (blog) {
      try {
        navi(`/readblog/${blog._id}`);
      } catch (error) {
        
      }
    }
    
  return (
    <>
  <Navbar></Navbar>

<div className={`w-full my-3`}>
       {blogs.length > 0 ? (
      <div className={` grid grid-cols-1 gap-4 justify-items-center `}>
           {  blogs.map((blog)=>{
              return   <div className={`w-[70%] p-3  rounded-3xl shadow-lg  hover:scale-110 hover:p-2 hovera:m-2 duration-500 ease-in-out hover:bg-amber-50`} key={blog._id}>
 <div className="flex flex-col items-center gap-1">
      <div className="home-title"> <h3 className={`font-semibold font-mono`}>{blog.title}</h3></div>
              
      <div className="home-content">
        <p className={`text-justify font-sans `}>{`${blog.content.substring(0,200)}...`}</p>
      </div>
               
             <div className="home-metadata">
              <div> 
                 
                 <div>
                   <label className={`font-serif`} id="writer"> writtenBy : </label>
                   <label className={`font-semibold`}>{blog.writtenBy}</label> 
                     </div>
               

              <div className={`my-2 text-center`}><a  onClick={()=>{
                handleBlog(blog)
                }} className={`bg-pink-200 rounded-2xl p-2 text-center text-white cursor-pointer hover:bg-gray-100 hover:border-pink-300 hover:text-pink-300 hover:scale-110 duration-300 ease-in-out `}>ReadBlog</a></div></div>
                
             </div>
                
              </div>
  </div>

            })}
      </div>
    ):(<h1>hello world</h1>)}  

</div>

 
    </>
  )
}

export default Landing


