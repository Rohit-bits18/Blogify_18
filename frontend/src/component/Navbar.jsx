import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50
                    bg-white/10 backdrop-blur-xl
                    border-b border-white/20">

      <div className="max-w-7xl mx-auto px-6 py-4
                      flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide
                     text-[#f5c16c]
                     hover:scale-105 transition-transform"
        >
          Daily Blogs
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-8 items-center text-gray-200">
          <li>
            <Link
              to="/profile"
              className="hover:text-[#f5c16c]
                         transition-colors duration-300"
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="hover:text-[#f5c16c]
                         transition-colors duration-300"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/reg"
              className="px-4 py-2 rounded-lg
                         bg-gradient-to-r from-[#f5c16c] to-[#e0a84b]
                         text-gray-900 font-semibold
                         hover:shadow-lg hover:scale-105
                         transition-all duration-300"
            >
              Register
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
