import { useState, useMemo } from "react";
import { Link } from "react-router";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import cute1 from "../assets/cute1.png";
import cute2 from "../assets/cute2.png";
import cute3 from "../assets/cute3.png";
import cute4 from "../assets/cute4.png";
import cute5 from "../assets/cute5.png";

import { api } from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // لو عايزين token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      toast.success("Logged in successfully!");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const fallingImages = [cute1, cute2, cute3, cute4, cute5];
  const numberOfCopies = 6;

  const fallingProps = useMemo(() => {
    return fallingImages.flatMap((img) =>
      Array.from({ length: numberOfCopies }).map(() => {
        return {
          img,
          left: Math.random() * 100,
          duration: 6 + Math.random() * 6,
          rotate: Math.random() * 360,
          scale: 0.5 + Math.random() * 1,
          delay: -1,
        };
      })
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
      <div className="relative bg-linear-to-br from-yellow-100 via-pink-100 to-pink-200 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-lg" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
              required
            />

            {/* Show/Hide Password Button */}
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
            </div>
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-pink-400 to-yellow-400 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-pink-200 text-sm sm:text-base"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-500 font-medium">
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
