import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaIdBadge,
} from "react-icons/fa";
import cute1 from "../assets/cute1.png";
import cute2 from "../assets/cute2.png";
import cute3 from "../assets/cute3.png";
import cute4 from "../assets/cute4.png";
import cute5 from "../assets/cute5.png";
import { useAuth } from "../hook";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { register, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      await register({ fullName, username, email, password });
      // Reset form on success
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (err) {
      // Error handled by hook and returned
      if (err.fieldErrors) {
        setErrors(err.fieldErrors);
      } else if (err.message) {
        setErrors({ general: err.message });
      }
    }
  };

  const fallingImages = [cute1, cute2, cute3, cute4, cute5];
  const numberOfCopies = 6;

  const fallingProps = useMemo(() => {
    return fallingImages.flatMap((img) =>
      Array.from({ length: numberOfCopies }).map(() => ({
        img,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 6,
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random(),
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

      {/* Register Form */}
      <div className="relative bg-gradient-to-br from-yellow-100 via-pink-100 to-pink-200 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {errors.general}
            </div>
          )}

          {/* Full Name */}
          <div>
            <div className="relative">
              <FaIdBadge className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-lg" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) {
                    setErrors({ ...errors, fullName: null });
                  }
                }}
                className={`border rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 text-sm sm:text-base ${
                  errors.fullName
                    ? "border-red-300 focus:ring-red-300 bg-red-50"
                    : "border-gray-300 focus:ring-pink-300"
                }`}
                required
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-lg" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors({ ...errors, username: null });
                  }
                }}
                className={`border rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 text-sm sm:text-base ${
                  errors.username
                    ? "border-red-300 focus:ring-red-300 bg-red-50"
                    : "border-gray-300 focus:ring-pink-300"
                }`}
                required
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-lg" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: null });
                  }
                }}
                className={`border rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 text-sm sm:text-base ${
                  errors.email
                    ? "border-red-300 focus:ring-red-300 bg-red-50"
                    : "border-gray-300 focus:ring-pink-300"
                }`}
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: null });
                  }
                }}
                className={`border rounded-xl p-3 pl-10 pr-10 w-full focus:outline-none focus:ring-2 text-sm sm:text-base ${
                  errors.password
                    ? "border-red-300 focus:ring-red-300 bg-red-50"
                    : "border-gray-300 focus:ring-pink-300"
                }`}
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-lg" />
                ) : (
                  <FaEye className="text-lg" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-semibold py-2 rounded-xl shadow-md transition duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 font-medium">
              Login
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

export default RegisterPage;
