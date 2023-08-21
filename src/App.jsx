import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import Nav from "./components/Nav"
import { SingleBlog } from "./pages/SingleBlog"
import AddBlog from "./pages/AddBlog"
import EditPage from "./pages/EditPage"
import RelatedPosts from "./pages/RelatedPosts"
import { useSelector } from "react-redux"
import {IoIosArrowRoundUp} from 'react-icons/io'
function App() {
  let [show,setShow] = useState(false)
  window.onscroll = () => window.scrollY > 100 ? setShow(true) : setShow(false)
  let handleTop = () => {
    window.scrollTo({
      top : 0,
      left : 0
    })
  }
  let {username,navigate} = useSelector((state) => state.user)
  return (
    <div className="w-full overflow-x-hidden xs:pt-5 lg:pt-44">
      <li onClick={handleTop} className={`${show ? 'scale-100' : 'scale-0'} z-[99999999] fixed group transition_2 cursor-pointer right-5 bottom-4 w-12 h-14 list-none flex items-center justify-center text-5xl hover:bg-black/5 rounded-md bg-black text-white`}>
        <IoIosArrowRoundUp className="group-hover:scale-125 scale-100 transition_2 arrow" />
      </li>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={(username && navigate) ? <Home/> : <Register />} />
          <Route path="/login" element={(username && navigate) ? <Home/> : <Login />} />
          <Route path="/blog/:id" element={(username && navigate) ? <SingleBlog /> : <Login />} />
          <Route path="/addBlog" element={(username && navigate) ? <AddBlog /> : <Login />} />
          <Route path="/editPage/:id" element={(username && navigate) ? <EditPage /> : <Login />} />
          <Route path="/relatedBlogs/:id" element={(username && navigate) ? <RelatedPosts /> : <Login />} />
          <Route path="/relatedTag/:id" element={(username && navigate) ? <RelatedPosts /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
