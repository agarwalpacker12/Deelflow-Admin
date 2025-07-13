import React from 'react';

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        {/* Avatar */}
        <div className="-mt-16 mb-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg border-4 border-white">
            <svg width="56" height="56" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" stroke="url(#profile-gradient)" strokeWidth="2" fill="white" />
              <defs>
                <linearGradient id="profile-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <ellipse cx="16" cy="13" rx="7" ry="7.5" fill="#6366f1" fillOpacity="0.12" />
              <ellipse cx="16" cy="13" rx="5" ry="5" fill="#6366f1" />
              <path d="M8.5 26c2-4 7-5 7.5-5s5.5 1 7.5 5" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>
        {/* User Info */}
        <h2 className="text-2xl font-bold text-slate-800 mb-1">John Doe</h2>
        <p className="text-slate-500 mb-6">johndoe@email.com</p>
        {/* Profile Details */}
        <div className="w-full space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 font-medium">Role:</span>
            <span className="text-slate-800">User</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 font-medium">Joined:</span>
            <span className="text-slate-800">June 2024</span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-4 w-full">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">Edit Profile</button>
          <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
