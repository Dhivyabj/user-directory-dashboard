import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, [id]);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-purple-50 p-8">
      <div
        className="max-w-3xl mx-auto bg-gradient-to-br from-pink-100 to-purple-100 
                   rounded-xl shadow-lg p-8 transition transform hover:shadow-2xl hover:scale-[1.02]"
      >
        
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
        >
          ← Back 
        </button>

        
        <h2 className="text-3xl font-bold mb-6 text-pink-700">{user.name}</h2>
        
        <div className="space-y-3 text-gray-800">
          <p><span className="font-semibold text-pink-600">Username:</span> {user.username}</p>
          <p><span className="font-semibold text-pink-600">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-pink-600">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold text-pink-600">Website:</span> {user.website}</p>
          <p>
            <span className="font-semibold text-pink-600">Address:</span> 
            {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
          </p>
          <p><span className="font-semibold text-pink-600">Company:</span> {user.company.name}</p>
          <p><span className="font-semibold text-pink-600">Catchphrase:</span> {user.company.catchPhrase}</p>
          <p><span className="font-semibold text-pink-600">Business:</span> {user.company.bs}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

