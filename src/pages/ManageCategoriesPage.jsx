import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import cute1 from "../assets/cute1.png";

const initialCategories = [
  { id: 1, name: "Toys", posts: 45, description: "Fun toys for kids", image: cute1 },
  { id: 2, name: "Electronics", posts: 30, description: "Latest electronic gadgets", image: cute1 },
  { id: 3, name: "Clothes", posts: 25, description: "Fashionable clothes", image: cute1 },
];

const ManageCategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (isNew) {
      setCategories([...categories, {...selectedCategory, id: Date.now(), posts: 0}]);
    } else {
      setCategories(prev => prev.map(cat => 
        cat.id === selectedCategory.id ? selectedCategory : cat
      ));
    }
    setSelectedCategory(null);
    setIsNew(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedCategory({...selectedCategory, image: imageUrl});
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-pink-600">Manage Categories</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category..."
              className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={() => { setSelectedCategory({name:"", description:"", image: cute1}); setIsNew(true); }}
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              Add Category
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {filtered.map(cat => (
            <div key={cat.id} className="bg-white shadow-lg rounded-2xl overflow-hidden relative">
              <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-bold text-pink-600 text-lg">{cat.name}</div>
                    <div className="text-gray-500 text-sm">{cat.posts} Posts</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-gray-700">{cat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==== MODAL للتعديل أو إضافة ==== */}
      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 w-96 relative z-10 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-pink-600">{isNew ? "Add Category" : "Edit Category"}</h3>
            <div className="space-y-3">
              <div>
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({...selectedCategory, name: e.target.value})}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="font-semibold">Description</label>
                <textarea
                  value={selectedCategory.description}
                  onChange={(e) => setSelectedCategory({...selectedCategory, description: e.target.value})}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="font-semibold">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => { setSelectedCategory(null); setIsNew(false); }}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategoriesPage;
