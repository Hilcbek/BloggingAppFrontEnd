import React, { useEffect, useState } from 'react'
import { BsFillPenFill, BsLink45Deg } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import { Axios } from '../utils/Acxios'
import PuffLoader from "react-spinners/ClipLoader";
import { useSelector } from 'react-redux';
export const SingleBlog = () => {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#000000");
    let [Blog,setBlog] = useState([])
    let {id} = useSelector((state) => state.user)
    let location = useLocation().pathname.split("/")[2]
    useEffect(() => {
        setLoading(true)
        let func = async () => {
            let res = await Axios.get(`/blog/searchById/${location}`)
            setBlog(res.data.data)
            res.data.data && setLoading(false)
        }
        location && func()
    },[location])
  return (
     <div className='w-full mt-14'>
        {loading ? <PuffLoader color={color} loading={loading} size={120} aria-label="Loading Spinner" data-testid="loader"/> : <div className='xs:w-11/12 md:w-9/12 mx-auto flex items-start justify-start flex-col blog my-8 shadow-md shadow-black/20 p-1'>
            {(Blog?.author?._id === id) && <div className='flex items-center justify-end w-full'>
                <Link to={`/editPage/${Blog._id}`} className='p-3 xs:w-8/12 md:w-2/12 bg-black text-white flex items-center justify-center text-xs rounded-sm'><BsFillPenFill className='mr-2' />Edit Post</Link>
            </div>}
            <h1 className='xs:text-xl sm:w-full sm:text-4xl xs:my-2 md:my-0 font-bold xs:underline sm:underline-no break-words xs:w-full md:w-11/12'>{Blog?.title}
                <div className='w-8/12 flex-wrap flex items-start justify-start my-2'>
                    {
                         Blog?.tag?.map((tag,idx) => (
                            <Link key={idx} to={`/relatedBlogs/${tag._id}`} className='mx-2 text-xs font-medium flex items-center justify-center group cursor-pointer hover:italic'><BsLink45Deg className='mr-1 group-hover:text-blue-800 cursor-pointer font-bold' />{tag?.tag}</Link>
                        ))
                    }
                </div>
            </h1>
            <div className='cursor-pointer z-[9999] xs:columns-1 md:columns-2 gap-2 lg:columns-3 w-full md:mr-5'>
                 {
                    Blog?.images?.map((img,idx) => (
                        <div className='w-full h-full mx-1'>
                            <img key={idx} className='image w-full h-full object-cover' src={img} alt="" />
                        </div>

                    ))
                 }
            </div>
            <div className=' ml-5 flex w-full items-start justify-between flex-col'>
                <p dangerouslySetInnerHTML={{__html : String(Blog?.desc)}}  className='my-2 xs:text-[14px] font-Poppins font-light sm:text-[18px] break-words w-[96%]'>
                </p>
                <div className='h-full my-5 w-[96%] flex items-center justify-end xs:pr-10 md:pr-3'>
                    <Link to={`/relatedBlogs/${Blog?.author?._id}`} className='hover:underline text-xs font-bold'><span className='font-normal mr-1'>Author :</span>{Blog?.author?.username}</Link>
                </div>
            </div>
        </div>}
     </div>
  )
}
