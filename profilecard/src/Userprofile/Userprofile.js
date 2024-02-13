import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('https://randomuser.me/api/?page=1&results=1&seed=abc');
        setUser(response.data.results[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {user && (
        <div className="min-w-sm p-2 w-80 rounded overflow-hidden shadow-lg mb-4">
          <div className="flex">
            <img className="w-40" src={user.picture.large} alt="User Profile" />
            <div className="px-6 py-4 w-1/2">
              <div className="flex justify-between mb-2">
                <div className="font-bold text-xl">{user.name.first}</div>
                <div className="font-bold text-xl">{user.name.last}</div>
              </div>
              <p className="text-gray-700 text-base">{user.gender}</p>
              <p className="text-gray-700 text-sm">{user.phone}</p>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div className={`max-w-xl rounded overflow-hidden shadow-lg ${showDetails ? 'w-full' : 'w-auto'}`}>
          <div className="flex items-center">
            <img
              className={`w-40 cursor-pointer p-1 ${showDetails ? 'ml-auto mr-auto' : ''}`}
              src={user.picture.large}
              alt="User Profile"
              onClick={toggleDetails}
            />
            {showDetails && (
              <div className="p-4 w-1/2">
                <div className="font-bold text-lg mb-2">Name: {user.name.first} {user.name.last}</div>
                <p className="text-gray-700 text-sm mb-2">Gender: {user.gender}</p>
                <p className="text-gray-700 text-sm mb-2">Mobile Number: {user.phone}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
