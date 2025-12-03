import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import cute1 from "../assets/cute1.png";

const mockReports = [
  { id: 1, username: "Alice", reason: "Inappropriate content", postLink: "#", status: "Open", date: "2025-11-29", avatar: cute1 },
  { id: 2, username: "Bob", reason: "Spam", postLink: "#", status: "Resolved", date: "2025-11-28", avatar: cute1 },
];

const AllReportsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = mockReports.filter(r =>
    (r.username.toLowerCase().includes(search.toLowerCase()) || r.reason.toLowerCase().includes(search.toLowerCase())) &&
    (filter === "All" || r.status === filter)
  );

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-pink-600">All Reports</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option>All</option>
              <option>Open</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Reason</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map(report => (
                  <tr key={report.id} className="border-b hover:bg-pink-50 cursor-pointer">
                    <td className="px-4 py-2 flex items-center">
                      <img src={report.avatar} alt="" className="w-8 h-8 rounded-full mr-2"/>
                      {report.username}
                    </td>
                    <td className="px-4 py-2">{report.reason}</td>
                    <td className="px-4 py-2">{report.status}</td>
                    <td className="px-4 py-2">{report.date}</td>
                    <td className="px-4 py-2">
                      <button
                        className="px-3 py-1 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
                        onClick={() => setSelectedReport(report)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl p-6 w-96 relative z-10">
            <h3 className="text-xl font-bold mb-2 text-pink-600">Report by {selectedReport.username}</h3>
            <p className="mb-2">{selectedReport.reason}</p>
            <a href={selectedReport.postLink} className="text-pink-500 underline mb-4 block">View Post</a>
            <button
              onClick={() => { alert(`Report ${selectedReport.id} resolved`); setSelectedReport(null); }}
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
    </div>
  );
};

export default AllReportsPage;
