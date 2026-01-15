import React, { useEffect, useState } from 'react'
import '../style/Update.css';
import { useNavigate, useParams } from 'react-router-dom';
import { setContent,setImage,setTitle, getApiCall, updateApiCall } from '../features/UpdatedSlice';
import axios from 'axios';
import '../style/Update.css'
import { useDispatch, useSelector } from "react-redux";

function UpdatePage() {
  const{title,content,image} = useSelector(state=>state.updateBlog)
  const dispatch = useDispatch();
  const[updateImg,setUpdateImage] = useState([]);
  const navi = useNavigate()
  const {id} = useParams();

          function getData() {
             dispatch(getApiCall(id))
             .then((res)=>{
              if(res.status == 404){
                navi("/profile")
                  return;
              }})}

      const handleImages = (e) => {
      dispatch(setUpdateImage([...e.target.files])); };

     async function DeleteImage(imgUrl) {
         try {
          
             const res = await axios.delete('/api/blog/deleteimage',{data:{_id:id,path:imgUrl}});
           
             if(res.data.status === 404){
              window.alert("some thing went wong");
              return;
             }
              const tempArr = image.filter((val)=>{
                return val !== imgUrl;
              })
                
              setImage(tempArr);
              getData();
         } catch (error) {
          console.log("there is an error in the DeleteImage function at updatePage");
         }
     }

     const handleSubmit = (e) => {
      e.preventDefault();

    if (title.length < 5 || content.length < 20) {
      alert("Title must be 5+ chars and content must be 20+ chars");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
     formData.append('id',id);
    updateImg.forEach((img) => {
      formData.append("image", img); 
    });

  
   dispatch(updateApiCall(formData))
   .then((res)=>{
       if(res.payload.status == 200){
              navi(`/readblog/${id}`)
              return;
            }
            else{
              window.alert("some thing went wrong")
            }
          })
  };

  useEffect(()=>{
      getData()
  },[id]);

         

  return (
    <>
   <div className='update-container'>
   <form onSubmit={handleSubmit}>
       
       <div className='update-title'>
         <label>Title:</label>
    <input type="text" name='title' value={title} onChange={(e)=>{
      dispatch(setTitle(e.target.value))
    }} id="input"/>
       </div>
    <div className='update-content'>
      <label>Content</label>
   <textarea name="content"  value={content}  onChange={(e)=>{
     dispatch(setContent(e.target.value))
   }} id="content" />  
    </div>
      
      <div className='update-upload'>
         <input type="file" name="image" className='' multiple onChange={handleImages}/>
      
       <button type='submit'>Submit</button>
      </div>
          
  

       </form>

    <label htmlFor="">images</label>

       {image && image.length>0 && (
        image.map((val,i)=>{
              return  <div className='image-section' key={i}>
                <img src= {val} id="img" alt="there should be image"/>
              <button className='update-delbtn' onClick={()=>{
                   DeleteImage(val)
              }}>Delete</button>
              </div>
              
        })
       )}
          
   </div>
    
    </>
  )
}

export default UpdatePage