import React from 'react'
import '../style/Navbar.css'
import { Link } from 'react-router-dom'
function navbar() {
  return (
    <>
    {/* <div className=
    "navbar">
    <div className=
    "nav-head">
      <p>Daily Blogs</p>
    </div>
    <div className=
    "nav-items">
      <ul>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/login'>Login</Link></li>    
        <li><Link to='/reg'>Register</Link></li>
      </ul>
    </div>
  </div> */}

    <div className=
    {`flex justify-around items-center p-3 bg-blue-200 w-full`}>
    <div className=
    {`font-bold font-serif`}>
      <p className=
      {`cursor-pointer hover:scale-110 hover:text-red-500 transition-all ease-in-out duration-400 `}>Daily Blogs</p>
    </div>
    <div>
      <ul className=
      {`flex gap-[1rem] justify-center items-center font-sans`}>
        <li><Link className=
        {`cursor-pointer font-mono hover:scale-110 hover:text-red-500 transition-all ease-in-out duration-400`} to='/profile'>Profile</Link></li>
        <li><Link className=
        {`cursor-pointer font-mono hover:font-semibold hover:scale-110 hover:text-red-500 transition-all ease-in-out duration-400`} to='/login'>Login</Link></li>    
        <li><Link className=
        {`cursor-pointer font-mono hover:scale-110 hover:text-red-500 transition-all ease-in-out duration-400`} to='/reg'>Register</Link></li>
      </ul>
    </div>
  </div>
    
    </>
  )
}

export default navbar