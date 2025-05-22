import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../auth";
 

const UserDetail = ({ user }) => {
  const navigate = useNavigate();
  
  const loggedInUser=getUser();

 
   

  const handleUpdateProfile = () => {
    navigate(`/private/update-profile`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full lg:w-80">
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
          {user?.name?.charAt(0)}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {user?.name}
        </h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <div className="text-gray-700 mb-4">
        <h3 className="text-md font-medium mb-2 border-b pb-1">About</h3>
        <p className="text-sm">{user?.about || "No bio provided."}</p>
      </div>

      {/* Conditionally render Update Profile button */}
      {loggedInUser?.id === user?.id && (
        <button
          onClick={handleUpdateProfile}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      )}
    </div>
  );
};

export default UserDetail;
