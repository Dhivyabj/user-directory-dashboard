import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [view, setView] = useState("table"); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...users].sort((a, b) => {
      const valA = field === "company" ? a.company.name : a[field];
      const valB = field === "company" ? b.company.name : b[field];
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
    setUsers(sorted);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-pink-800">User Directory</h2>
          <div className="space-x-2">
            <button
              onClick={() => setView("table")}
              className={`px-4 py-2 rounded-lg transition ${
                view === "table"
                  ? "bg-pink-600 text-white shadow"
                  : "bg-pink-200 text-pink-700 hover:bg-pink-300"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-4 py-2 rounded-lg transition ${
                view === "grid"
                  ? "bg-purple-600 text-white shadow"
                  : "bg-purple-200 text-purple-700 hover:bg-purple-300"
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-pink-300 rounded-lg px-4 py-2 mb-6 w-full focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />

        
        {view === "table" ? (
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-pink-100">
              <tr>
                <th
                  className="px-4 py-2 text-left font-semibold text-pink-700 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                </th>
                <th className="px-4 py-2 text-left font-semibold text-pink-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-semibold text-pink-700">
                  Phone
                </th>
                <th
                  className="px-4 py-2 text-left font-semibold text-pink-700 cursor-pointer"
                  onClick={() => handleSort("company")}
                >
                  Company
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => navigate(`/user/${user.id}`)}
                  className="hover:bg-pink-50 cursor-pointer transition"
                >
                  <td className="border-t px-4 py-2">{user.name}</td>
                  <td className="border-t px-4 py-2">{user.email}</td>
                  <td className="border-t px-4 py-2">{user.phone}</td>
                  <td className="border-t px-4 py-2">{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="bg-gradient-to-br from-pink-100 to-purple-100 border rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="text-lg font-bold text-pink-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
                <p className="text-purple-700 font-medium">{user.company.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;