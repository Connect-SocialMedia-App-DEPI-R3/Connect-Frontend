import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import { authApi } from "../api";
import { setAuthToken } from "../utils";

import cute1 from "../assets/cute1.png";
import cute2 from "../assets/cute2.png";
import cute3 from "../assets/cute3.png";
import cute4 from "../assets/cute4.png";
import cute5 from "../assets/cute5.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  const navigate = useNavigate();

  // ✅ HOOK LESSON: Keep form submission logic clean and focused
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ Use the authApi from our custom API module
      const { data } = await authApi.login({ email, password });

      // ✅ Store token using helper function
      if (data.token) {
        setAuthToken(data.token);
      }

      toast.success("Logged in successfully!");

      // ✅ Reset form
      setEmail("");
      setPassword("");

      // ✅ Navigate to home
      setUser();
      navigate("/");
      window.location.reload(); // hack for the sidebar to load first time
    } catch (error) {
      // ✅ Error is already handled by authApi with toast
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }; // ✅ HOOK LESSON: useMemo to avoid recalculating on every render
  const fallingImages = [cute1, cute2, cute3, cute4, cute5];
  const numberOfCopies = 6;

  const fallingProps = useMemo(() => {
    return fallingImages.flatMap((img) =>
      Array.from({ length: numberOfCopies }).map(() => ({
        img,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 6,
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        delay: -1,
      }))
    );
  }, []);

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100 overflow-hidden p-6 sm:p-10">
      {/* Falling Animated Characters */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {fallingProps.map((props, index) => (
          <img
            key={index}
            src={props.img}
            alt="cute character"
            className="absolute"
            style={{
              left: `${props.left}%`,
              width: `${40 * props.scale}px`,
              height: `${40 * props.scale}px`,
              animationName: "fall",
              animationDuration: `${props.duration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${props.delay}s`,
              transform: `rotate(${props.rotate}deg)`,
            }}
          />
        ))}
      </div>

      {/* Login Form */}
      <div className="relative bg-gradient-to-br from-yellow-100 via-pink-100 to-pink-200 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-lg" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 pl-10 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
              required
              disabled={isLoading}
            />

            {/* Toggle Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <FaEyeSlash className="text-lg" />
              ) : (
                <FaEye className="text-lg" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-pink-500 font-medium hover:text-pink-600"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-150vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(120vh) rotate(360deg);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
