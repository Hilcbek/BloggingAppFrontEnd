import React from "react"
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

function App() {
  let {username,navigate} = useSelector((state) => state.user)
  return (
    <div className="w-full overflow-x-hidden pt-44">
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
