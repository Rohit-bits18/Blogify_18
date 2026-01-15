import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {setEmail,setName,setPhone,setPassword, regCallApi} from '../features/RegistrationSlice';
import { useEffect } from 'react';

  const Reg = () =>  {
         const dispatch = useDispatch();
         const {name,email,phone,password,status} = useSelector(state => state.regUser);
         const navi = useNavigate();


    function handlePhone(e){
        const {value} = e.target
        let temp = value.replace(/[^0-9]/g,"");
        dispatch(setPhone(temp));
    }


   function handleSubmit(){   

     if(!name || !email.includes('@') ){
       window.alert("fill the userData carefully");
       return;}
       dispatch(regCallApi({name,email,phone,password}));
           }
          
  useEffect(()=>{   
    
    if(status == 404){
        window.alert("something went wrong");
        return;
      }

      if(status == 201 || status == 200){
        navi("/login")
        return;
      }},[status])

	return (
	  <>
 
        <label htmlFor=''>Name: </label> 
    <input autoComplete='off' type="text" value={name} onChange={(e)=>{
      dispatch(setName(e.target.value));
    }}  name="name" />

        <label htmlFor=''>email: </label> 
    <input autoComplete='off' type="text" value={email}  onChange={(e)=>{
      dispatch(setEmail(e.target.value));
    }}  name="email" />

        <label htmlFor=''>phone: </label> 
    <input autoComplete='off' minLength={10} maxLength={10} type="text" value={phone} onChange={handlePhone}  name="phone" />

        <label htmlFor=''>password: </label> 
    <input autoComplete='off' type="text" value={password} onChange={(e)=>{
      dispatch(setPassword(e.target.value));
    }}  name="password" />

    <button onClick={handleSubmit}>Register</button>
	  </>
	);
  }
  
  export default Reg;
  