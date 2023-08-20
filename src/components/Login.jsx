import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../utils/Acxios'
import PuffLoader from "react-spinners/ClipLoader";
import {useDispatch} from 'react-redux'
import { LOGIN } from '../Redux/userReducer';
const Login = () => {
  let [show,setShow] = useState(false)
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  let [username,setUsername] = useState('')
  let [password,setPassword] = useState('')
  let [error,setError] = useState('')
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let handleLogin = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      let res = await Axios.post('/auth/login',{
          username : username,
          password : password,
        })
        res.data.data && setLoading(false)
        dispatch(LOGIN({ username : res.data.data.username, profile : res.data.data.profile ,navigate : true, id : res.data.data._id }))
        navigate('/')
    } catch (error) {
        setError(error.response.data.error)
        Settelr()
    }
  }
  let Settelr = () => {
    setTimeout(() => {
      setError('')
      setLoading(false)
    },3000)
  }
  return (
    <div className='w-full xs:h-[80vh] x_xl:h-[65vh] flex items-center justify-center'>
      <div className='md:w-3/12 xs:w-10/12 mx-auto shadow-md shadow-black/50 p-1'>
        <h1 className='text-3xl mb-4 underline text-center'>Login</h1>
        {error && <h1 className='break-words text-xs text-center font-bold w-full text-red-500'>{error}</h1>}
        <form action="" className='relative w-11/12 mx-auto flex items-center justify-center flex-col' onSubmit={handleLogin}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder='Username or Email address' className='p-3 font-medium border-solid border-black border-[1px] my-1 w-full outline-none text-xs' id="" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={show ?  'text' : 'password'} name="password" id="password" className="p-3 font-medium border-solid border-black border-[1px] my-1 w-full outline-none text-xs" placeholder='Password' />
          {!show ? <li onClick={() => setShow(!show)} className='cursor-pointer w-10 absolute top-[66px] right-5 h-10 flex items-center justify-center rounded-full bg-black/10'><BsEye/></li> : <li onClick={() => setShow(!show)} className='cursor-pointer top-[66px] right-5 w-10 absolute h-10 flex items-center justify-center rounded-full bg-black/10'><BsEyeSlash /></li>}
          <button className='w-full bg-black text-white p-3 cursor-pointer my-1 hover:tracking-widest transition'>{loading ? <PuffLoader color={color} loading={loading} size={18} aria-label="Loading Spinner" data-testid="loader"/> : 'Sign In'}</button>
        </form>
        <Link className='text-center w-full text-xs flex items-center justify-center my-2 group' to={'/register'}>Don't have an Account ? <span className='ml-2 group-hover:shadow-lg shadow-green-800 group-hover:text-green-800'>Register</span></Link>
      </div>
    </div>
  )
}

export default Login