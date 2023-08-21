import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import { Axios } from '../utils/Acxios'
import PuffLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from 'react-redux';
import { REFRESH } from '../Redux/userReducer';
const Blogs = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");
  let [posts,setPosts] = useState([])
  let [search2,setSearch2] = useState('')
  let [hotSearch,setHotSearch] = useState([])
  let {deleter} = useSelector((state) => state.user)
  let dispatch = useDispatch()
  useEffect(() => {
    let AllPost = async () => {
      setLoading(true)
      let res = await Axios.get('/blog');
      setPosts(res.data.data)
      res.data.data && setLoading(false)
      dispatch(REFRESH({ deleter : true }))
    }
    AllPost()
  },[deleter])
    useEffect(() => {
      let result = async () => {
        setLoading(true)
          let res = await Axios.get(`/blog/search?title=${search2}`)
          setHotSearch(res.data.data)
          res.data.data && setLoading(false)
      }
      search2 && result()
  },[search2])
   let [show,setShow] = useState(false)
  window.onscroll = () => window.scrollY > 10 ? setShow(true) : setShow(false)
  return (
    <div className={`${loading ? 'flex items-center justify-center flex-col' : 'flex items-start justify-start flex-col' } w-full my-5 relative`}>
          {posts.length > 0 && <div className={`mb-2 flex items-center justify-start mr-1 w-full`}>
              <input value={search2} onChange={(e) => setSearch2(e.target.value)} type="text" placeholder='Search post by title...' className='pl-5 w-full text-sm outline-none mr-2 p-[13px] rounded-3xl border=-solid border-black/60 border-[1px]' />
          </div>}
        {
          loading ? <PuffLoader color={color} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> : ((Array.isArray(hotSearch) || Array.isArray(posts)) && (hotSearch.length > 0 || posts.length > 0)) ? (
            (hotSearch.length > 0 ? hotSearch : posts).map((post) => (
              <Blog data={post} />
            ))
          ) : <h1 className='text-4xl'>No Posts Today! 🥺</h1>
        }
    </div>
  )
}

export default Blogs