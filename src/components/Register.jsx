import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { Axios, Upload } from '../utils/Acxios'
import PuffLoader from "react-spinners/PuffLoader";
const Register = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  let [image,setImage] = useState('https://www.pngmart.com/files/21/Account-User-PNG-Photo.png')
  let [show,setShow] = useState(false)
  let [username,setUsername] = useState('')
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [error,setError] = useState('')
  let navigate = useNavigate()
  let handleRegister = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      let profile = await Upload(image);
      if(profile){
        let res = await Axios.post('/auth/register',{
          username : username,
          password : password,
          email : email,
          profile : profile
        })
        res.data && setLoading(false)
        navigate('/login')
      }else{
        setError('please select your profile if, so check your network connection!')
        Settelr()
      }
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
    <div className='w-full xs:h-[80vh] x_xl:h-[60vh] flex items-center justify-center'>
      <div className='md:w-3/12 xs:w-10/12 mx-auto p-1 shadow-md shadow-black/50'>
        <h1 className='text-3xl mb-4 underline text-center'>Register</h1>
        {error && <h1 className='break-words text-xs text-center font-bold w-full text-red-500'>{error}</h1>}
        <form action="" className='relative w-11/12 mx-auto flex items-center justify-center flex-col' onSubmit={handleRegister}>
          <label htmlFor="image" className='w-14 cursor-pointer h-14 border-solid border-black border-[1px] p-1 rounded-full mx-auto my-2'>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="image" className='hidden' />
            <img src={(image !== 'https://www.pngmart.com/files/21/Account-User-PNG-Photo.png') ? URL.createObjectURL(image) : 'https://www.pngmart.com/files/21/Account-User-PNG-Photo.png'} alt="" className='w-full h-full object-cover rounded-full' />
          </label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder='Username' className='p-3 font-medium border-solid border-black border-[1px] my-1 w-full outline-none text-xs' id="" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="" className="p-3 font-medium border-solid border-black border-[1px] my-1 w-full outline-none text-xs" placeholder='Email address' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={show ?  'text' : 'password'} name="password" id="password" className="p-3 font-medium border-solid border-black border-[1px] my-1 w-full outline-none text-xs" placeholder='Password' />
          {!show ? <li onClick={() => setShow(!show)} className='cursor-pointer w-10 absolute top-[196px] right-5 h-10 flex items-center justify-center rounded-full bg-black/10'><BsEye/></li> : <li onClick={() => setShow(!show)} className='cursor-pointer top-[196px] right-5 w-10 absolute h-10 flex items-center justify-center rounded-full bg-black/10'><BsEyeSlash /></li>}
          <button className='w-full bg-black text-white p-3 cursor-pointer flex items-center justify-center my-1 hover:tracking-widest transition'>{loading ? <PuffLoader color={color} loading={loading} size={18} aria-label="Loading Spinner" data-testid="loader"/> : 'Sign Up'}</button>
        </form>
        <Link className='text-center w-full text-xs flex items-center justify-center my-2 group' to={'/login'}>Already have an Account ? <span className='ml-2 group-hover:shadow-lg shadow-green-800 group-hover:text-green-800'>Login</span></Link>
      </div>
    </div>
  )
}
//

export default Register