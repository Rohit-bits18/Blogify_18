import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
   status:'idle',
   title:'',
   content:'',

}


export const addApiCall = createAsyncThunk('addBlog/post',
  
  async function (data,{rejectWithValue}){
 try {
      const res = await axios.post("/api/blog/addblog", data);
       return res.data;
      
    } catch (error) {
      return rejectWithValue("there is an error in the addApiCall at AddBlogSlice")
    }  
})


const AddSlice = createSlice({
  name:"addBlog",
  initialState,
  reducers:{
       setTitle:(state,action)=>{
           state.title = action.payload
       },
        setContent:(state,action)=>{
           state.content = action.payload
       },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(addApiCall.fulfilled,(state,action)=>{
      state.status = 'success'
      
    })
     .addCase(addApiCall.rejected,(state,action)=>{
      state.status = 'rejected'

    })
     .addCase(addApiCall.pending,(state,action)=>{
      state.status = 'pending'
    })
  }

})


export const {setContent,setTitle} = AddSlice.actions
export default AddSlice.reducer