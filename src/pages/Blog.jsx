import React, { useState } from 'react'
import {BsArrowLeft, BsArrowRight, BsFillPenFill, BsLink45Deg} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {MdDelete} from 'react-icons/md'
import { Axios } from '../utils/Acxios'
import PuffLoader from "react-spinners/PuffLoader";
import { REFRESH } from '../Redux/userReducer'
const Blog = ({data}) => {
    let [loading,setLoading] = useState(false)
    let [color,setColor] = useState('#000000')
    let {id,username,navigate} = useSelector((state) => state.user)
    let dispatch = useDispatch()
    let handleTop = () => {
        window.scrollTo({
            top : 0,
            left:  0
        })
    }
    let DeletePost = async (id) => {
        setLoading(true)
        let res = await Axios.delete(`/blog/${id}`)
        res.data.data && setLoading(false)
        dispatch(REFRESH({ deleter : false }))
    }
  return (
    <div className='w-full flex items-start justify-start xs:flex-col lg:flex-row blog my-8 shadow-md shadow-black/20 p-1'>
       <abbr title="Click to read more" className='cursor-pointer w-full mr-5'>
         <Link onClick={handleTop} to={username ? `/blog/${data?._id}` : '/login'}>
            <img className='image w-full h-full object-cover' src={data?.images[0]} alt="" />
            </Link>
       </abbr>
        <div className='md:ml-5 flex w-full items-start justify-between flex-col'>
            <h1 className='xs:text-xl sm:w-full sm:text-4xl font-bold xs:underline sm:underline-no break-words xs:w-full md:w-11/12'>{data?.title}</h1>
            <h2 className='my-3 text-xs font-medium ml-5 w-full flex items-start justify-start xs:flex-col sm:flex-row group cursor-pointer'>
                <div className='w-8/12 flex-wrap flex items-start justify-start'>
                    {
                        data?.tag?.map((tag) => <Link to={`/relatedBlogs/${tag._id}`} className='mx-2 flex items-center justify-start hover:underline hover:italic'><BsLink45Deg className='mr-1 group-hover:text-blue-800 cursor-pointer font-bold' />{tag?.tag}</Link>)
                    }
                </div>
                <span className='md:ml-2 xs:mt-2 md:mt-0 xs:font-bold md:font-normal'>{data?.createdAt}</span>
             </h2>
            <p dangerouslySetInnerHTML={{__html : String(data?.desc).substring(0,300).concat('...')}} className='my-2 xs:text-[14px] font-Poppins font-light sm:text-3xl break-words w-[96%]'>
            </p>
            <div className={`${(data.author._id === id) ? 'justify-between' : 'justify-end'} h-full my-5 xs:w-[90%] sm:w-[96%] flex items-center`}>
                <Link to={username ? `/relatedBlogs/${data?.author?._id}` : '/login'} className='text-xs font-bold'><span className='font-normal mr-1'>Author :</span>{data?.author?.username}</Link>
                {(data.author._id === id && navigate) && <Link to={username ? `/editPage/${data._id}` : '/login'}  className='p-3 xs:w-7/12 sm:w-4/12 bg-black hover:border-[#009866] text-white flex items-center justify-center text-xs rounded-sm group'><BsFillPenFill className='mr-2 group-hover:text-[#009866]' /><span className='group-hover:text-[#009866]'>Edit Post</span></Link>}
            </div>
            {(data.author._id === id && navigate) && <button onClick={() => DeletePost(data._id)} className='z-[999999] hover:bg-white pointer-events-auto p-3 my-3 text-sm rounded-sm cursor-pointer bg-black hover:border-red-800 text-white xs:w-7/12 sm:w-4/12 group flex items-center justify-center'><MdDelete className='mr-1 group-hover:text-red-800' />{loading ? <PuffLoader color={color} loading={loading} size={18} aria-label="Loading Spinner" data-testid="loader"/> : <span className='group-hover:text-red-800'>Delete Post</span>}</button>}
        </div>
    </div>
  )
}

export default Blog