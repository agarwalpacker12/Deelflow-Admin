import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">First Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Last name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Role</label>
            <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
              <option value="wholesaler">Wholesaler</option>
              <option value="investor">Investor</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-white/70 mt-4">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
