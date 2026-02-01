import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { readCallApi } from '../features/ReadBlogSlice';
import Loader from '../component/Loader';

function ReadBlog() {
  const { id } = useParams()
  const { status, ans } = useSelector(state => state.readBlog)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readCallApi(id))
  }, [id, dispatch])

  if (status === 'pending') {
    return <Loader />
  }

  if (!ans) {
    return (
      <div className="min-h-screen flex items-center justify-center
                      bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]
                      text-gray-200">
        No blog found 📝
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10
                    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      {/* Blog Card */}
      <div className="max-w-4xl mx-auto
                      bg-white/10 backdrop-blur-xl
                      border border-white/20
                      rounded-3xl shadow-2xl
                      p-6 sm:p-8">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl
                       font-semibold text-[#f5c16c]
                       text-center mb-6">
          {ans.title}
        </h1>

        {/* Images */}
        {ans.images && ans.images.length > 0 && (
          <div className="flex flex-col gap-6 mb-6">
            {ans.images.map((val, index) => (
              <div
                key={index}
                className="w-full flex justify-center"
              >
                <img
                  src={val}
                  alt="blog"
                  className="w-full max-w-3xl
                             rounded-xl shadow-lg
                             object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="text-gray-200 text-base sm:text-lg
                        leading-relaxed text-justify whitespace-pre-line">
          {ans.content}
        </div>
      </div>
    </div>
  )
}

export default ReadBlog
