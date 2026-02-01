import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { profileApi } from '../features/ProfileSlice'

function Profile() {
  const navi = useNavigate()
  const dispatch = useDispatch()

  const { blogList, data, status } =
    useSelector(state => state.userProfile)

  const callApi = () => {
    dispatch(profileApi("/api/user/profile"))
  }

  async function handleLogOut() {
    try {
      const res = await axios.post('/api/user/logout')
      if (res.data.status === 200) {
        navi('/login')
        return
      }
      alert("Something went wrong")
    } catch (error) {
      console.log("Logout error")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/blog/deleteblog', { data: { id } })
      callApi()
    } catch (error) {
      console.log("Delete error")
    }
  }

  useEffect(() => {
    callApi()
  }, [])

  if (status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center
                      bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]
                      text-gray-200">
        Loading...
      </div>
    )
  }

  if (status === 404) {
    navi('/login')
    return null
  }

  if (!data) {
    return <p className="text-center text-gray-300">No data found</p>
  }

  return (
    <div className="min-h-screen px-4 py-10
                    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      <div className="max-w-5xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-xl
                        border border-white/20
                        rounded-3xl shadow-2xl
                        p-6 sm:p-8
                        flex flex-col sm:flex-row
                        items-center gap-6 mb-10">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full
                          bg-gradient-to-r from-[#f5c16c] to-[#e0a84b]
                          flex items-center justify-center
                          text-3xl font-bold text-gray-900">
            {data.name.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-[#f5c16c]">
              {data.name.toUpperCase()}
            </h2>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => navi('/addblog')}
              className="px-4 py-2 rounded-lg
                         bg-gradient-to-r from-[#f5c16c] to-[#e0a84b]
                         text-gray-900 font-semibold
                         hover:scale-105 transition"
            >
              Add Blog
            </button>

            <button
              onClick={handleLogOut}
              className="px-4 py-2 rounded-lg
                         border border-red-400 text-red-400
                         hover:bg-red-400 hover:text-white
                         transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white/10 backdrop-blur-xl
                        border border-white/20
                        rounded-3xl shadow-xl
                        p-6 sm:p-8">

          <h3 className="text-xl font-semibold text-[#f5c16c] mb-6">
            Your Blogs
          </h3>

          {blogList.length > 0 ? (
            <div className="flex flex-col gap-4">
              {blogList.map((blog) => (
                <div
                  key={blog._id}
                  className="flex flex-col sm:flex-row
                             justify-between items-start sm:items-center
                             gap-4
                             bg-white/5 rounded-xl p-4
                             hover:bg-white/10 transition"
                >
                  <p className="text-gray-200 font-medium">
                    {blog.title}
                  </p>

                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => navi(`/updateblog/${blog._id}`)}
                      className="text-blue-400 hover:underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navi(`/readblog/${blog._id}`)}
                      className="text-green-400 hover:underline"
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">
              You haven’t uploaded any blogs yet 📝
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
