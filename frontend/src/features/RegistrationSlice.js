
  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  status:'idle', name:"",email:"",phone:"",password:""
}

export const regCallApi = createAsyncThunk('reg/post',async(userData,{rejectWithValue})=>{
  try {
    const res = await axios.post("/api/user/reg",{data:userData});
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log("there is an error in the regCallApi");
    return rejectWithValue("there is an error in the regCallApi");
  }
})


const RegistrationSlice = createSlice({
  name:'regUser',
  initialState,
  reducers:{
    setName:(state,action)=>{
      state.name = action.payload
    },
    setEmail:(state,action)=>{
      state.email = action.payload
    },
    setPhone:(state,action)=>{
      state.phone = action.payload
    },
    setPassword:(state,action)=>{
      state.password = action.payload
    }   
  },
  extraReducers:(builder)=>{
    builder
    .addCase(regCallApi.fulfilled,(state,action)=>{
      state.status = action.payload.status
    })
     .addCase(regCallApi.pending,(state,action)=>{
      state.status = 'pending'
    })
     .addCase(regCallApi.rejected,(state,action)=>{
      state.status = 'rejected'
    })
  }
})

export const {setEmail,setName,setPhone,setPassword} = RegistrationSlice.actions
export default RegistrationSlice.reducer