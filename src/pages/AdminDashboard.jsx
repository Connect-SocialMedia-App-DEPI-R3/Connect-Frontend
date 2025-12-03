import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { FaUsers, FaStore, FaClipboard, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router";
import cute1 from "../assets/cute1.png";
import cute2 from "../assets/cute2.png";

const mockStats = {
  totalUsers: 150,
  totalSellers: 45,
  totalPosts: 320,
  totalMarketPosts: 120,
};

const mockReports = [
  { id: 1, username: "Alice", reason: "Inappropriate content", postLink: "#", avatar: cute1 },
  { id: 2, username: "Bob", reason: "Spam", postLink: "#", avatar: cute1 },
];

const mockCategories = [
  { id: 1, name: "Toys" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Clothes" },
  { id: 4, name: "Books" },
];

const mockUnverifiedUsers = [
  { id: 1, username: "Charlie", avatar: cute2, idCardLink: "#" },
  { id: 2, username: "David", avatar: cute2, idCardLink: "#" },
];

const AdminDashboard = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedUnverified, setSelectedUnverified] = useState(null);

  const handleResolveReport = (reportId) => {
    alert(`Report ${reportId} resolved`);
    setSelectedReport(null);
  };

  const handleVerifyUser = (userId) => {
    alert(`User ${userId} verified`);
    setSelectedUnverified(null);
  };

  return (
    <div className=" bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="p-6 space-y-6">
        {/* ==== TOP STATS مع أيقونات ==== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center">
            <FaUsers size={40} className="text-black mb-2" />
            <div className="text-2xl font-bold text-pink-600">{mockStats.totalUsers}</div>
            <div className="text-gray-500">Total Users</div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center">
            <FaStore size={40} className="text-black mb-2" />
            <div className="text-2xl font-bold text-pink-600">{mockStats.totalSellers}</div>
            <div className="text-gray-500">Sellers</div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center">
            <FaClipboard size={40} className="text-black mb-2" />
            <div className="text-2xl font-bold text-pink-600">{mockStats.totalPosts}</div>
            <div className="text-gray-500">Posts</div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center">
            <FaBoxOpen size={40} className="text-black mb-2" />
            <div className="text-2xl font-bold text-pink-600">{mockStats.totalMarketPosts}</div>
            <div className="text-gray-500">Market Posts</div>
          </div>
        </div>

        {/* ==== REPORTS ==== */}
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-pink-600">Reports</h2>

            <Link
               to="/all-reports"
               className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            >
            View All Reports
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center p-2 border rounded-xl cursor-pointer hover:bg-pink-50 transition"
                onClick={() => setSelectedReport(report)}
              >
                <img src={report.avatar} alt="" className="w-10 h-10 rounded-full mr-3" />
                <div className="font-semibold">{report.username}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ==== MARKET CATEGORIES ==== */}
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-pink-600">Market Categories</h2>
              <Link
               to="/manage_Categories"
               className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            >
            Edit Categories
            </Link>
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mockCategories.map((cat) => (
              <div key={cat.id} className="bg-pink-50 rounded-xl p-4 text-center font-semibold text-pink-700">
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* ==== UNVERIFIED USERS ==== */}
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-pink-600">Unverified Users</h2>
            <Link
               to="/Unverified_users"
               className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
            >
            View All Users
            </Link>
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mockUnverifiedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-2 border rounded-xl cursor-pointer hover:bg-pink-50 transition"
                onClick={() => setSelectedUnverified(user)}
              >
                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full mr-3" />
                <div className="font-semibold">{user.username}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==== MODALS ==== */}
      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 w-96 relative z-10 shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-pink-600">Report by {selectedReport.username}</h3>
            <p className="mb-2">{selectedReport.reason}</p>
            <a href={selectedReport.postLink} className="text-pink-500 underline mb-4 block">View Post</a>
            <button
              onClick={() => handleResolveReport(selectedReport.id)}
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              Mark as Resolved
            </button>
            <button
              onClick={() => setSelectedReport(null)}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedUnverified && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 w-96 relative z-10 shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-pink-600">{selectedUnverified.username} - ID Verification</h3>
            <img src={selectedUnverified.avatar} alt="" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <a href={selectedUnverified.idCardLink} className="text-pink-500 underline mb-4 block text-center">View ID Card</a>
            <button
              onClick={() => handleVerifyUser(selectedUnverified.id)}
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              Verify User
            </button>
            <button
              onClick={() => setSelectedUnverified(null)}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
