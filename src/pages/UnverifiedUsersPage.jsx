import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import cute2 from "../assets/cute2.png";

const mockUsers = [
  { id: 1, username: "Charlie", avatar: cute2, idCardLink: "#", verified: false },
  { id: 2, username: "David", avatar: cute2, idCardLink: "#", verified: true },
  { id: 3, username: "Emma", avatar: cute2, idCardLink: "#", verified: false },
];

const UnverifiedUsersPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);

  const filtered = users.filter((u) => {
    const matchSearch = u.username.toLowerCase().includes(search.toLowerCase());
    if (filter === "verified") return u.verified && matchSearch;
    if (filter === "unverified") return !u.verified && matchSearch;
    return matchSearch;
  });

  const verifyUser = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, verified: true } : u))
    );
    setSelectedUser(null);
  };

  const unverifyUser = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, verified: false } : u))
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Sidebar />

      <div className="flex-1 md:ml-96 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Manage Users</h2>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user..."
            className="border rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl border ${
              filter === "all" ? "bg-pink-500 text-white" : "bg-white text-gray-600"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("verified")}
            className={`px-4 py-2 rounded-xl border ${
              filter === "verified"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Verified
          </button>

          <button
            onClick={() => setFilter("unverified")}
            className={`px-4 py-2 rounded-xl border ${
              filter === "unverified"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Unverified
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-pink-100">
              <tr>
                <th className="p-4">Avatar</th>
                <th className="p-4">Username</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-pink-50 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="p-4">
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">
                    {user.verified ? (
                      <span className="text-green-600 font-bold">Verified</span>
                    ) : (
                      <span className="text-yellow-600 font-bold">Unverified</span>
                    )}
                  </td>
                  <td className="p-4 flex gap-2">

                    {/* VERIFY BUTTON */}
                    {!user.verified && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          verifyUser(user.id);
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                      >
                        Verify
                      </button>
                    )}

                    {/* UNVERIFY EDIT BUTTON */}
                    {user.verified && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          unverifyUser(user.id);
                        }}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
                      >
                        Unverify
                      </button>
                    )}

                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

          <div className="bg-white rounded-2xl p-6 w-96 z-10">
            <h3 className="text-xl font-bold mb-3 text-pink-600">
              {selectedUser.username} - ID Verification
            </h3>

            <img
              src={selectedUser.avatar}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />

            <a
              href={selectedUser.idCardLink}
              className="text-pink-500 underline block text-center mb-4"
            >
              View ID Card
            </a>

            {!selectedUser.verified ? (
              <button
                onClick={() => verifyUser(selectedUser.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition w-full mb-2"
              >
                Verify User
              </button>
            ) : (
              <button
                onClick={() => unverifyUser(selectedUser.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition w-full mb-2"
              >
                Unverify User
              </button>
            )}

            <button
              onClick={() => setSelectedUser(null)}
              className="px-4 py-2 bg-gray-300 w-full text-gray-700 rounded-xl hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnverifiedUsersPage;
