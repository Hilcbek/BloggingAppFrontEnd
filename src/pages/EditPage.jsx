import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import {AiOutlineReload} from 'react-icons/ai'
import 'react-quill/dist/quill.snow.css';
import {FcPicture} from 'react-icons/fc'
import PuffLoader from "react-spinners/ClipLoader";
import { Axios, Upload } from '../utils/Acxios';
import { useLocation, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import Multiselect from 'multiselect-react-dropdown';
const EditPage = () => {
  let location = useLocation().pathname.split("/")[2]
  let [Blog,setBlog] = useState([])
  let [loading3,setLoading3] = useState(false)
   useEffect(() => {
        setLoading3(true)
        let func = async () => {
            let res = await Axios.get(`/blog/searchById/${location}`)
            res.data.data && setLoading3(false)
            setBlog(res.data.data)
            setTitle(res.data.data.title)
            setValue(res.data.data.desc)
            setImages(res.data.data.images)
        }
        location && func()
    },[location])
  let [images,setImages] = useState([])
  const [value, setValue] = useState('');
  let [title,setTitle] = useState('')
  let [tags,setTags] = useState([])
  let navigate = useNavigate()
  let [loading, setLoading] = useState(false);
  let [loading2,setLoading2] = useState(false)
  let [color, setColor] = useState("#ffffff");
  let [error,setError] = useState('')
  let [TagsAll,setTagsAll] = useState([])
  let ImagesCloud = []
  let {id} = useSelector((state) => state.user);
  useEffect(() => {
    images && Array?.from(images)?.map((image) => {
      let imageContainer = document.createElement('img')
      imageContainer.src = (String(image).match("cloudinary") ? image : URL.createObjectURL(image))
      document.querySelector('.imageContainer').append(imageContainer)
  })
  },[images])
  let handleReload = () => {
    document.querySelectorAll('.imageContainer img').forEach((images) => images.src = '')
    setImages([])
  }
  useEffect(() => {
    let AxiosFetch = async () => {
      setLoading2(true)
      try {
        let Tags = await Axios.get('/tag')
        Tags.data.data && setLoading2(false)
        setTagsAll(Tags.data.data)
      } catch (error) {
        setError(error.response.data.error)
        setLoading2(false)
      }
    }
    AxiosFetch()
  },[])
  let AddPost = async () => {
    let filters = tags.map((tag) => { return tag.split("(")[1].split(")")[0]})
    setLoading(true)
    try {
        for(let i = 0; i < images.length; i++){
          let res = await Upload(images[i]);
          ImagesCloud.push(res)
        }

        let UploadPost = await Axios.put(`/blog/editPost/${location}`,{
          title : title,
          desc : value,
          tag : filters,
          images : ImagesCloud,
          author : id,
        })
        UploadPost.data.data && setLoading(false)
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
    <div className='xs:w-11/12 pt-32 md:w-9/12 mx-auto  md:py-3 relative'>
      {error && <h1 className='break-words text-xs text-center font-bold w-full text-red-500'>{error}</h1>}
      <h1 className='text-2xl my-2'>Blog - id</h1>
      <input value={Blog._id} readOnly type="text" className='p-2 outline-none border-solid border-black/20 border-[1px] w-full' />
      <h1 className='text-2xl my-2'>Edit Title</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='p-2 outline-none border-solid border-black/20 border-[1px] w-full' />
      <h1 className='text-2xl my-2'>Edit Body</h1>
      <ReactQuill className='' theme="snow" value={value} onChange={setValue} />
      <h1 className='text-2xl my-2'>Edit Tags</h1>
       <Multiselect onSelect={(e) => setTags(e)} isObject={false} options={TagsAll.map((data) => (data.tag + ' ' +  `(${data._id})`))} />
      <h1 className='text-2xl my-2'>Edit Upload Image</h1>
       <label htmlFor='image' className='cursor-pointer p-2 border-solid border-[1px] border-black/40 my-3 w-full'>
          <input multiple onChange={(e) => {handleReload(); setImages(e.target.files);}} type="file" name="image" id="image" className='hidden pointer-events-none' />
          <FcPicture classNametext-4xl/> 
       </label>
        {images.length > 0 && <abbr title='use this to remove All the images'><li onClick={handleReload} className='cursor-pointer list-none absolute top-[480px] right-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/20'><AiOutlineReload /></li></abbr>}
       <div className='columns-3 gap-3 my-8 imageContainer relative border-solid border-black/40 rounded-md w-full p-1 border-[1px]'>
          {!images.length && <h1 className='xs:text-xs md:text-md w-full'>Your images appears here!</h1>}
       </div>
      <button onClick={() => AddPost()} className='pointer-events-auto p-2 my-3 text-sm rounded-sm cursor-pointer bg-black text-white w-full'>{loading ? <PuffLoader color={color} loading={loading} size={18} aria-label="Loading Spinner" data-testid="loader"/> : 'Edit Post'}</button>
    </div>
  )
}

export default EditPage