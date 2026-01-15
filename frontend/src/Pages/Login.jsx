import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setEmail,setPassword,LoginCallApi } from '../features/LoginSlice';

  const Login = () =>  { 
    const dispatch = useDispatch()
		const{email,password} = useSelector(state=>state.loginUser)
    const navi = useNavigate();		


	 function handleSubmit(){   
		
		 if(!email.includes('@') ){
			 window.alert("fill the userData carefully");
			 return;}
        
			 dispatch(LoginCallApi({email,password})).then((res)=>{
				  console.log(res.payload)
				     if(res.payload.status == 404){
							navi('/reg')
							
						 }else{					
							navi("/home")
							}
						 return;
			 })}


	return (
		<>
		<div class="login-container">
              
                    
              
          <div class="login-box">
              <div class="login-element">
                <label htmlFor='' >login</label>
              </div>
               <div class="login-element">
            	<label htmlFor=''>email: </label> 
		<input  autoComplete='off' type="text" value={email}  onChange={(e)=>{
			dispatch(setEmail(e.target.value))
		}}   name="email" />
    
          </div>
          
          <div class="login-password">
            	<label htmlFor=''>password: </label> 
		<input  autoComplete='off' type="text" value={password} onChange={(e)=>{
			dispatch(setPassword(e.target.value))
		}}   name="password" />
 
          </div>

          	<button onClick={handleSubmit}>Register</button>
          </div>
       
	

	
        </div>
	

		</>
	);
  }
  
  export default Login;
  