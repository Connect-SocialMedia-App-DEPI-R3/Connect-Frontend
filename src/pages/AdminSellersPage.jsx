import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import cute2 from "../assets/cute2.png";

const mockSellers = [
  { id: 1, name: "Seller A", posts: 12, active: true },
  { id: 2, name: "Seller B", posts: 4, active: false },
  { id: 3, name: "Seller C", posts: 18, active: true },
];

const AdminSellersPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockSellers.filter((s) => {
    const match = s.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "active") return s.active && match;
    if (filter === "banned") return !s.active && match;
    return match;
  });

  return (
    <div className="flex min-h-screen bg-pink-50">
      <Sidebar />

      <div className="flex-1 md:ml-96 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Manage Sellers</h2>

          <input
            type="text"
            placeholder="Search seller..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-2 w-64 focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="flex gap-3 mb-6">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-xl border ${filter === "all" ? "bg-pink-500 text-white" : "bg-white"}`}>
            All
          </button>

          <button onClick={() => setFilter("active")} className={`px-4 py-2 rounded-xl border ${filter === "active" ? "bg-green-500 text-white" : "bg-white"}`}>
            Active
          </button>

          <button onClick={() => setFilter("banned")} className={`px-4 py-2 rounded-xl border ${filter === "banned" ? "bg-red-500 text-white" : "bg-white"}`}>
            Banned
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-pink-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Posts</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b hover:bg-pink-50">
                  <td className="p-4">{s.name}</td>
                  <td className="p-4">{s.posts}</td>
                  <td className="p-4">
                    {s.active ? (
                      <span className="text-green-600 font-bold">Active</span>
                    ) : (
                      <span className="text-red-600 font-bold">Banned</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1 bg-pink-500 text-white rounded-xl hover:bg-pink-600">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No sellers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSellersPage;
