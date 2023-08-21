import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Axios } from '../utils/Acxios'
import PuffLoader from "react-spinners/ClipLoader";
import { BsFillPenFill, BsLink45Deg } from 'react-icons/bs';
import { useSelector } from 'react-redux';
const RelatedPosts = () => {
    let {id} = useSelector((state) => state.user)
    let location = useLocation().pathname.split("/")[2]
    let [Blogs,setBlogs] = useState([])
    let [loading,setLoading] = useState(false)
    let [color,setColor] = useState('#000000')
    useEffect(() => {
        setLoading(true)
        let func = async () => {
            let res = await Axios.get(`/blog/relatedBlogs/${location}`)
            setBlogs(res.data.data)
            res.data.data && setLoading(false)
        }
        location && func()
    },[location])
  return (
    <div className='flex items-start mt-12 justify-start min-h-screen flex-col xs:w-11/12 md:w-9/12 mx-auto'>
        {(Array.isArray(Blogs) && Blogs.length > 0) && <h1 className='text-xl font-bold'>Related Posts of <span className='italic text-red-500'>`{Blogs[0]?.author?.username}`</span></h1>}
        {
            loading ? <PuffLoader color={color} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> : (Array.isArray(Blogs) && Blogs.length > 0) ? (
                Blogs?.map((data) => (
                    <Link to={`/blog/${data?._id}`} className='w-full flex items-start justify-start xs:flex-col lg:flex-row blog my-8 shadow-md shadow-black/20 p-1'>
                            <div className='cursor-pointer w-full mr-5'>
                                <img className='image w-full h-full object-cover' src={data?.images[0]} alt="" />
                            </div>
                                    <div className=' ml-5 flex w-full items-start justify-between flex-col'>
                                        <h1 className='xs:text-2xl xs:w-11/12 sm:w-full sm:text-4xl font-bold'>{data?.title}</h1>
                                        <h2 className='my-2 text-xs font-medium ml-5 flex items-center justify-center group cursor-pointer'><BsLink45Deg className='mr-1 group-hover:text-blue-800 cursor-pointer' />{
                                        data?.tag?.map((tag) => <Link to={`/relatedBlogs/${tag._id}`} className='mr-1 hover:underline hover:italic'>{tag?.tag}</Link>)
                                        } <span className='ml-2'>{data?.createdAt}</span></h2>
                                        <p dangerouslySetInnerHTML={{__html : String(data?.desc)}} className='w-[96%] cursor-auto break-words'>
                                    </p>
                                    <div className={`${(data.author._id === id) ? 'justify-between' : 'justify-end'} h-full my-5 xs:w-[90%] sm:w-[96%] flex items-center`}>
                                        <Link to={`/relatedBlogs/${data?.author?._id}`} className='text-xs font-bold'><span className='font-normal mr-1'>Author :</span>{data?.author?.username}</Link>
                                        {(data.author._id === id) && <Link to={`/editPage/${data._id}`}  className='p-3 w-4/12 bg-black text-white flex items-center justify-center text-xs rounded-sm'><BsFillPenFill className='mr-2' />Edit Post</Link>}
                                    </div>
                                </div>
                    </Link>
                ))
            ) : <h1 className='text-4xl mt-20'>{Blogs}</h1>
        }
    </div>
  )
}

export default RelatedPosts