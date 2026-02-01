import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  setPhone,
  setPassword,
  regCallApi
} from '../features/RegistrationSlice';
import { useEffect } from 'react';

const Reg = () => {
  const dispatch = useDispatch();
  const { name, email, phone, password, status } =
    useSelector(state => state.regUser);

  const navi = useNavigate();

  function handlePhone(e) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    dispatch(setPhone(value));
  }

  function handleSubmit() {
    if (!name || !email.includes('@')) {
      alert("Fill the user data carefully");
      return;
    }
    dispatch(regCallApi({ name, email, phone, password }));
  }

  useEffect(() => {
    if (status === 404) {
      alert("Something went wrong");
      return;
    }

    if (status === 201 || status === 200) {
      navi("/login");
    }
  }, [status, navi]);

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      <div className="w-full max-w-md p-8 rounded-2xl
                      bg-white/10 backdrop-blur-xl
                      shadow-2xl border border-white/20">

        <h2 className="text-center text-3xl font-semibold text-[#f5c16c] mb-8">
          Create Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            className="w-full px-4 py-3 rounded-lg
                       bg-white/20 text-white
                       focus:outline-none focus:ring-2 focus:ring-[#f5c16c]"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="w-full px-4 py-3 rounded-lg
                       bg-white/20 text-white
                       focus:outline-none focus:ring-2 focus:ring-[#f5c16c]"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="text"
            value={phone}
            minLength={10}
            maxLength={10}
            onChange={handlePhone}
            className="w-full px-4 py-3 rounded-lg
                       bg-white/20 text-white
                       focus:outline-none focus:ring-2 focus:ring-[#f5c16c]"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="w-full px-4 py-3 rounded-lg
                       bg-white/20 text-white
                       focus:outline-none focus:ring-2 focus:ring-[#f5c16c]"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl
                     bg-gradient-to-r from-[#f5c16c] to-[#e0a84b]
                     text-gray-900 font-semibold text-lg
                     hover:scale-[1.02] hover:shadow-xl
                     transition-all duration-300"
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Reg;
