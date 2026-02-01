import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import {
  setContent,
  setImage,
  setTitle,
  getApiCall,
  updateApiCall
} from '../features/UpdatedSlice'

function UpdatePage() {
  const { title, content, image } =
    useSelector(state => state.updateBlog)

  const dispatch = useDispatch()
  const [updateImg, setUpdateImg] = useState([])
  const navi = useNavigate()
  const { id } = useParams()

  function getData() {
    dispatch(getApiCall(id)).then((res) => {
      if (res?.status === 404) {
        navi("/profile")
      }
    })
  }

  const handleImages = (e) => {
    setUpdateImg([...e.target.files])
  }

  async function deleteImage(imgUrl) {
    try {
      const res = await axios.delete('/api/blog/deleteimage', {
        data: { _id: id, path: imgUrl }
      })

      if (res.data.status === 404) {
        alert("Something went wrong")
        return
      }

      const updatedImages = image.filter(val => val !== imgUrl)
      dispatch(setImage(updatedImages))
    } catch (error) {
      console.log("Delete image error")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.length < 5 || content.length < 20) {
      alert("Title must be 5+ chars and content must be 20+ chars")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("id", id)

    updateImg.forEach((img) => {
      formData.append("image", img)
    })

    dispatch(updateApiCall(formData)).then((res) => {
      if (res.payload?.status === 200) {
        navi(`/readblog/${id}`)
      } else {
        alert("Something went wrong")
      }
    })
  }

  useEffect(() => {
    getData()
  }, [id])

  return (
    <div className="min-h-screen px-4 py-10
                    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      <div className="max-w-4xl mx-auto
                      bg-white/10 backdrop-blur-xl
                      border border-white/20
                      rounded-3xl shadow-2xl
                      p-6 sm:p-8">

        <h2 className="text-center text-3xl font-semibold
                       text-[#f5c16c] mb-8">
          Update Blog
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              className="w-full px-4 py-3 rounded-lg
                         bg-white/20 text-white
                         focus:outline-none focus:ring-2
                         focus:ring-[#f5c16c]"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-300 mb-2">
              Content
            </label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => dispatch(setContent(e.target.value))}
              className="w-full px-4 py-3 rounded-lg
                         bg-white/20 text-white
                         focus:outline-none focus:ring-2
                         focus:ring-[#f5c16c]
                         resize-none"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-gray-300 mb-2">
              Add New Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImages}
              className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:font-semibold
                         file:bg-gradient-to-r
                         file:from-[#f5c16c] file:to-[#e0a84b]
                         file:text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl
                       bg-gradient-to-r from-[#f5c16c] to-[#e0a84b]
                       text-gray-900 font-semibold text-lg
                       hover:scale-[1.02] hover:shadow-xl
                       transition-all duration-300"
          >
            Update Blog
          </button>
        </form>

        {/* Existing Images */}
        {image && image.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold
                           text-[#f5c16c] mb-4">
              Existing Images
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {image.map((val, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden
                             shadow-lg border border-white/20"
                >
                  <img
                    src={val}
                    alt="blog"
                    className="w-full h-48 object-cover"
                  />

                  <button
                    onClick={() => deleteImage(val)}
                    className="absolute top-2 right-2
                               bg-red-500 text-white
                               px-3 py-1 rounded-lg
                               text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default UpdatePage
