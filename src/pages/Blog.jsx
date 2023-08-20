import React, { useState } from 'react'
import {BsArrowLeft, BsArrowRight, BsFillPenFill, BsLink45Deg} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Blog = ({data}) => {
    let {id,username,navigate} = useSelector((state) => state.user)
    let handleTop = () => {
        window.scrollTo({
            top : 0,
            left:  0
        })
    }
  return (
    <Link onClick={handleTop} to={username ? `/blog/${data?._id}` : '/login'} className='w-full flex items-start justify-start xs:flex-col lg:flex-row blog my-8 shadow-md shadow-black/20 p-1'>
        <div className='cursor-pointer w-full mr-5'>
            <img className='image w-full h-full object-cover' src={data?.images[0]} alt="" />
        </div>
        <div className=' ml-5 flex w-full items-start justify-between flex-col'>
            <h1 className='xs:text-2xl xs:w-11/12 sm:w-full sm:text-4xl font-bold'>{data?.title}</h1>
            <h2 className='my-3 text-xs font-medium ml-5 flex items-center justify-center group cursor-pointer'><BsLink45Deg className='mr-1 group-hover:text-blue-800 cursor-pointer' />{
            data?.tag?.map((tag) => <Link to={`/relatedBlogs/${tag._id}`} className='mr-1 hover:underline hover:italic'>{tag?.tag}</Link>)
            } <span className='ml-2'>{data?.createdAt}</span></h2>
            <p dangerouslySetInnerHTML={{__html : String(data?.desc).substring(0,300).concat('...')}} className='w-[96%] cursor-auto break-words'>
            </p>
            <div className={`${(data.author._id === id) ? 'justify-between' : 'justify-end'} h-full my-5 xs:w-[90%] sm:w-[96%] flex items-center`}>
                <Link to={username ? `/relatedBlogs/${data?.author?._id}` : '/login'} className='text-xs font-bold'><span className='font-normal mr-1'>Author :</span>{data?.author?.username}</Link>
                {(data.author._id === id && navigate) && <Link to={username ? `/editPage/${Blog._id}` : '/login'}  className='p-3 w-4/12 bg-black text-white flex items-center justify-center text-xs rounded-sm'><BsFillPenFill className='mr-2' />Edit Post</Link>}
            </div>
        </div>
    </Link>
  )
}

export default Blog