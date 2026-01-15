import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import '../style/Profile.css'
import { useDispatch, useSelector } from "react-redux";
import { profileApi } from '../features/ProfileSlice';

function Profile() {
  const navi = useNavigate();
  const dispatch = useDispatch();
 
 const {blogList,data,status} = useSelector(state => state.userProfile)
  

    const callApi = ()=>{
          dispatch(profileApi("/api/user/profile"));
         }
      
    async function handleLogOut() {
      try {
        const res = await axios.post('/api/user/logout');
          if(res.data.status ==200){
            navi('/login');
            return;
          }

          window.alert("something went wrong")
      } catch (error) {
        console.log("there is an error in the logOut function at profile page")
      }
    }

  const handleBlog =function (id) {
        navi(`/readblog/${id}`);
    }

    const handleDelete =async function(id){
     try {
                 const res = await axios.delete('/api/blog/deleteblog',{data:{id:id}});
                  
                  console.log(res); 
                  callApi();
          
             } catch (error) {
              console.log('there is an error in the useDlelte')
             }

    }


  useEffect(()=>{
  callApi();
  },[])

if (status == 'pending' ) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  }

  if (status == 404 ) {
   navi('/login');
   return;
  }
  
  return (
    <>
    {!data ? "no data found" : (  <div className="profile-body">
  <div className="profile-container">
              <div className="profile-data">
         
                   
                 <div className="profile-letter">{data?.name.charAt(0).toUpperCase()}</div> 
                  <div className="profile-name">{data.name.toUpperCase()}</div>
                   <div className="add-blog"><a onClick={()=>{
                         navi('/addblog')
                   }}>Add_Blog</a> </div>

                   <div className="logout" ><a onClick={handleLogOut}>logOut</a> </div>
              </div>

            <div className="your-blogs">
             
            </div>

              <div className="profile-bloglist">
                 <p>your written blogs</p>
             
             { blogList.length > 0 ?(
                blogList.map((blog)=>{
                  return( <div className="profile-blog">
                       <div className="profile-title">
                         <p>{blog.title}</p>
                       </div>    

                             <div className="profile-custombtn">
                          <a onClick={()=>{
                             navi(`/updateblog/${blog._id}`);
                          }} >update</a>
                          <a  onClick={()=>{
                            handleDelete(blog._id)
                            }}>delete</a>
                          <a  onClick={()=>{
                            handleBlog(blog._id)
                          }}>read</a>

                       </div>
                       </div>)
                })
             ):"you have not upload blog yet"}


                       
                       

                      
              </div>
       </div>
        </div>)}
      
     
    </>
  );
};



export default Profile



