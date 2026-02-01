import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const [blogs, setBlogs] = useState([])
  const navi = useNavigate()

  async function callApi() {
    try {
      const res = await axios.get("/api/blog/home")

      if (res.data.status === 404) {
        alert("Something went wrong")
        return
      }

      setBlogs(res.data.blogs)
    } catch (error) {
      console.log("Error fetching blogs")
    }
  }

  useEffect(() => {
    callApi()
  }, [])

  const handleBlog = (blog) => {
    navi(`/readblog/${blog._id}`)
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-4 py-10
                      bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

        {blogs.length > 0 ? (
          <div className="max-w-6xl mx-auto
                          grid grid-cols-1 md:grid-cols-2 gap-8">

            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/10 backdrop-blur-xl
                           border border-white/20
                           rounded-3xl p-6
                           shadow-xl
                           hover:scale-[1.03]
                           transition-all duration-300"
              >
                {/* Title */}
                <h3 className="text-xl font-semibold text-[#f5c16c] mb-3">
                  {blog.title}
                </h3>

                {/* Content */}
                <p className="text-gray-200 text-sm leading-relaxed mb-4 text-justify">
                  {blog.content.substring(0, 200)}...
                </p>

                {/* Metadata */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-300">
                    ✍️ {blog.writtenBy}
                  </span>

                  <button
                    onClick={() => handleBlog(blog)}
                    className="px-4 py-2 rounded-xl
                               bg-gradient-to-r from-[#f5c16c] to-[#e0a84b]
                               text-gray-900 font-semibold text-sm
                               hover:shadow-lg hover:scale-105
                               transition-all duration-300"
                  >
                    Read Blog
                  </button>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="text-center text-gray-300 text-xl mt-20">
            No blogs found 📝
          </div>
        )}
      </div>
    </>
  )
}

export default Landing
