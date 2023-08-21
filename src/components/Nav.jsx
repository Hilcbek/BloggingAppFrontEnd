import React, { useEffect, useState } from 'react'
import { BsLink45Deg } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {CiSearch,CiUser} from 'react-icons/ci'
import {useDispatch, useSelector} from 'react-redux'
import {CiHome} from 'react-icons/ci'
import {PiDoorOpenThin} from 'react-icons/pi'
import { LOGOUT } from '../Redux/userReducer'
import { Axios } from '../utils/Acxios'
import {FiMenu} from 'react-icons/fi'
import {IoCloseSharp} from 'react-icons/io5'
import PuffLoader from "react-spinners/ClipLoader";
const Nav = () => {
    let location = useLocation().pathname
    let [show,setShow] = useState(false)
    let [loading,setLoading] = useState(false)
    let [color,setColor]  = useState('#000')
    let {username,profile,navigate} = useSelector((state) => state.user)
    let dispatch = useDispatch()
    let [TagsAll,setTagsAll] = useState([])
    useEffect(() => {
        let AxiosFetch = async () => {
        setLoading(true)
        try {
                let Tags = await Axios.get('/tag')
                Tags.data.data && setLoading(false)
                setTagsAll(Tags.data.data)
            } catch (error) {
                setError(error.response.data.error)
                setLoading(false)
            }
        }
        AxiosFetch()
    },[])
    let navigater = useNavigate()
    let Logout = async () => {
       try {
        let res = await Axios.post('/auth/logout')
        setShow(!show)
         res.data.data && navigater('/')
         dispatch(LOGOUT({ navigate : false }))
       } catch (error) {
        alert(error.response.data.error)
       }    
    }
    document.querySelectorAll('.buttons button').forEach((button) => button.addEventListener('click', () => setShow(!show)))
  return (
    <nav className={`z-[9999999] fixed shadow-md shadow-black/20 py-1 top-0 w-full bg-white/90`}>
        <div className='xs:w-11/12 lg:w-9/12 mx-auto flex items-center justify-between'>
            <ul className='flex items-center justify-center'>
                <Link to={'/'} className='flex items-center justify-center transition'>
                    <h1 className='logo font-bold xs:text-2xl sm:text-3xl hover:tracking-widest'>BLOG-APP</h1>
                </Link>
            </ul>
            <div className='x_xl:flex xs:hidden items-center justify-end w-9/12'>
                {(username && navigate) ? <div className='flex items-center justify-between w-full'>
                    <ul className='flex items-center w-full ml-3 justify-end text-sm font-medium '>
                        <Link to={'/'} className='mx-1 relative before:absolute before:left-0 before:-bottom-1 before:bg-black/50 before:rounded-md before:content-[""] before:w-0 before:h-[2px] before:hover:w-full flex items-center justify-start'><CiHome className={'mr-1'} />Home</Link>
                        <Link to={'/addblog'} className='mx-1 relative before:absolute before:left-0 before:-bottom-1 before:bg-black/50 before:rounded-md before:content-[""] before:w-0 before:h-[2px] before:hover:w-full flex items-center justify-start'><CiHome className={'mr-1'} />Add Blog</Link>
                        <div className='w-11 h-11 rounded-full border-solid p-1 border-black/70 border-[2px]'>
                            <img className='w-full h-full object-contain rounded-full' src={profile} alt="" />
                        </div>
                        <p className='mx-2 text-xs font-medium'>Hello✌️, {username}</p>
                        <button onClick={Logout} className='z-[999] ml-2 p-2 border-solid border-black/50 rounded-md tracking-wider text-xs border-[1px]'>Logout</button>
                    </ul>
                </div> : 
                <ul className='flex items-center justify-center text-sm font-normal cursor-pointer'>
                    <Link to={'/register'} className='flex items-center justify-start mx-3 relative before:absolute before:left-0 before:-bottom-1 before:bg-black/50 before:rounded-md before:content-[""] before:w-0 before:h-[2px] before:hover:w-full'><CiUser  className={'mr-1'} /> Register</Link>
                    <Link to={'/login'} className='flex items-center justify-start mx-3 relative before:absolute before:left-0 before:-bottom-1 before:bg-black/50 before:rounded-md before:content-[""] before:w-0 before:h-[2px] before:hover:w-full'><PiDoorOpenThin className={'mr-1'} />Login</Link>
                </ul>}
            </div>
            <li onClick={() => setShow(!show)} className='z-[9999] w-10 h-10 xs:flex x_xl:hidden items-center justify-center rounded-full bg-black/10 cursor-pointer'>
                {show ? <IoCloseSharp className='text-2xl' /> : <FiMenu className='text-2xl' />}
            </li>
        </div>
        {(username && navigate && !location.includes('/addblog')) && <div className='x_xl:flex xs:hidden items-center justify-start w-9/12 mx-auto my-3 flex-wrap max-h-[90px] overflow-y-scroll'>
            <h1 className='text-xl font-bold mr-3'>Related Tags :</h1>
            {
                loading ? <PuffLoader color={color} loading={loading} size={18} aria-label="Loading Spinner" data-testid="loader"/> : TagsAll.map((tag,idx) => (
                    <Link onClick={() => setShow(!show)} key={idx} to={`/relatedTag/${tag._id}`} className='drop flex items-center my-1 justify-center rounded-[10px] border-solid p-1 border-blue-800 border-[1px] mx-1 w-auto cursor-pointer group scale-100 transition'><p className='text-xs font-normal'>{tag.tag}</p> <BsLink45Deg className={'group-hover:scale-110 group-hover:text-red-500 drop text-xl'} /></Link>
                ))
            }
            
        </div>}
        <div className={`${show ? 'right-0' : 'right-[-110%]'} x_xl:hidden xs:flex pt-16  bg-white z-[999] top-0 max-h-screen h-screen items-start justify-start flex-col w-full absolute`}>
            {(username && navigate && !location.includes('/addblog')) &&
            <div className='buttons flex items-start justify-start z-[999] w-11/12 flex-1 mx-auto my-3 max-h-[200px] flex-wrap overflow-y-scroll'>
                <h1 className='text-xl font-bold mr-3'>Related Tags :</h1>
               {
                loading ? <PuffLoader color={color} loading={loading} size={18} aria-label="Loading Spinner" data-testid="loader"/> : TagsAll.map((tag,idx) => (
                    <Link onClick={() => setShow(!show)} key={idx} to={`/relatedTag/${tag._id}`} className='drop flex items-center my-1 justify-center rounded-[10px] border-solid p-1 border-blue-800 border-[1px] mx-1 w-auto cursor-pointer group scale-100 transition'><p className='text-xs font-normal'>{tag.tag}</p> <BsLink45Deg className={'group-hover:scale-110 text-xl group-hover:text-red-500 drop'} /></Link>
                ))
            }
            </div>}
            <div className='x_xl:hidden xs:flex mt-10 items-start justify-start flex-col w-11/12 mx-auto'>
                {(username && navigate) ? <div className='flex items-center justify-startt flex-col w-full'>
                    <ul className='flex items-start w-full flex-col ml-3 justify-start text-sm font-medium'>
                        <Link onClick={() => setShow(!show)} to={'/'} className='w-full link my-2 relative before:absolute before:left-0 before:-bottom-1 before:bg-black/50 before:rounded-md before:content-[""] before:w-0 before:h-[2px] before:hover:w-full flex items-center justify-start'><CiHome className={'mr-1'} />Home</Link>
                        <Link onClick={() => setShow(!show)} to={username ? '/addblog' : '/'} className='w-full link my-2 relative before:absolute before:left-0 before:-bottom-1 before:bg-black/50 before:rounded-md before:content-[""] before:w-0 before:h-[2px] before:hover:w-full flex items-center justify-start'><CiHome className={'mr-1'} />Add Blog</Link>
                        <div className='w-11 h-11 rounded-full my-2 border-solid p-1 border-black/70 border-[2px]'>
                            <img className='w-full h-full object-contain rounded-full' src={profile} alt="" />
                        </div>
                        <p className='mx-2 text-xs font-medium'>Hello✌️, {username}</p>
                        <button onClick={Logout} className='z-[999] my-2 w-full p-3 border-solid border-black/50 rounded-md tracking-wider text-xs border-[1px]'>Logout</button>
                    </ul>
                </div> : 
                <ul className='flex items-start justify-start text-sm font-normal flex-col cursor-pointer w-full'>
                    <Link onClick={() => setShow(!show)} to={'/register'} className='w-full my-2 flex items-center justify-start mx-3 relative before:absolute before:left-0 before:-bottom-1 before:bg-black/50 before:rounded-md before:content-[""] before:w-0 before:h-[2px] before:hover:w-full'><CiUser  className={'mr-1'} /> Register</Link>
                    <Link onClick={() => setShow(!show)} to={'/login'} className='w-full my-2 flex items-center justify-start mx-3 relative before:absolute before:left-0 before:-bottom-1 before:bg-black/50 before:rounded-md before:content-[""] before:w-0 before:h-[2px] before:hover:w-full'><PiDoorOpenThin className={'mr-1'} />Login</Link>
                </ul>}
            </div>
        </div>
    </nav>
  )
}

export default Nav