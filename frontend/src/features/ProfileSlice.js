import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const profileApi = createAsyncThunk('profile/post',async function (data,{rejectWithValue}) {

  try {
      const res = await axios.get("/api/user/profile");
      console.log(res);
      return res?.data;
  } catch (error) {
    console.log("there is an error in the profileApi")
    return rejectWithValue("there is an error in the profileApi");
  }
})

const initialState = {
  status:'idle',
   data:null,
   blogList:[],
   
}

const ProfileSlice = createSlice({
      name:'userProfile',
      initialState,
      reducers:{},
      extraReducers:(builder)=>{
           builder
           .addCase(profileApi.fulfilled,(state,action)=>{
            state.status = action.payload.status
             state.data = action.payload.userData
             state.blogList = action.payload.blogList
            
           })
             .addCase(profileApi.pending,(state,action)=>{
            state.status = 'pending'
           })
             .addCase(profileApi.rejected,(state,action)=>{
            state.status = 'rejected'
           })
      }
})


export default ProfileSlice.reducer