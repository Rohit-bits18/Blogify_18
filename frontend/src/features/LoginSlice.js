
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  email:"",password:"",status:"idle"
}

export const LoginCallApi = createAsyncThunk('loginUser/post',async function (userData,{rejectWithValue}) {
        try {
            const res = await axios.post("/api/user/login",{data:userData})
            console.log(res.data)
            return res.data
        } catch (error) {
          console.log("there is an error in the Login Call Api at LoginSlice");
          return rejectWithValue("there is an error in the Login Call Api at LoginSlice");
        }
}) 

 const LoginSlice = createSlice({
  name:"userLogin",
  initialState,
  reducers:{
    setEmail:(state,action)=>{
        state.email = action.payload
    },
      setPassword:(state,action)=>{
        state.password = action.payload
    }
  },
  extraReducers:(builder)=>{
       builder
       .addCase(LoginCallApi.fulfilled,(state,action)=>{
            state.status = 'success'
       })
        .addCase(LoginCallApi.pending,(state,action)=>{
            state.status = "pending"
       })
        .addCase(LoginCallApi.rejected,(state,action)=>{
            state.status = "rejected"
       })
  }
})


export const {setEmail,setPassword} = LoginSlice.actions
export default LoginSlice.reducer