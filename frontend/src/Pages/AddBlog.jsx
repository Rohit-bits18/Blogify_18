import { useDispatch, useSelector } from "react-redux";
import { setContent, setTitle, addApiCall } from "../features/AddBlogSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../component/Loader";

function AddBlog() {
  const dispatch = useDispatch();
  const { content, title, status } = useSelector((state) => state.addBlog);
  const [images, setImages] = useState([]);
  const navi = useNavigate();

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length < 5 || content.length < 20) {
      alert("Title must be 5+ chars and content must be 20+ chars");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    images.forEach((img) => {
      formData.append("image", img);
    });

    dispatch(addApiCall(formData)).then((res) => {
      if (res.payload?.status === 404) {
        navi("/login");
      } else {
        navi("/home");
      }
    });
  };

  return (
    <div className="min-h-screen px-4 py-10
                    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      {status === "pending" && <Loader />}

      <div className="max-w-3xl mx-auto
                      bg-white/10 backdrop-blur-xl
                      border border-white/20
                      rounded-3xl shadow-2xl
                      p-6 sm:p-8">

        <h2 className="text-center text-3xl font-semibold
                       text-[#f5c16c] mb-8">
          Add New Blog
        </h2>

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
              placeholder="Enter blog title"
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
              placeholder="Write your blog content..."
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-300 mb-2">
              Add Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImages}
              className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-gradient-to-r
                         file:from-[#f5c16c] file:to-[#e0a84b]
                         file:text-gray-900
                         hover:file:opacity-90"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl
                       bg-gradient-to-r from-[#f5c16c] to-[#e0a84b]
                       text-gray-900 font-semibold text-lg
                       hover:scale-[1.02] hover:shadow-xl
                       transition-all duration-300"
          >
            Publish Blog
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddBlog;
