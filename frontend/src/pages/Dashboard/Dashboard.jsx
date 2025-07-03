import React from 'react';
import { BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-gray-400">Welcome back!</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users className="w-6 h-6" />}
          title="Total Leads"
          value="1,234"
          change="+12%"
          positive={true}
        />
        <StatCard 
          icon={<BarChart3 className="w-6 h-6" />}
          title="Active Deals"
          value="56"
          change="+8%"
          positive={true}
        />
        <StatCard 
          icon={<DollarSign className="w-6 h-6" />}
          title="Revenue"
          value="$125,000"
          change="+23%"
          positive={true}
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />}
          title="Conversion Rate"
          value="18.5%"
          change="+5%"
          positive={true}
        />
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">New lead from website</span>
              <span className="text-sm text-gray-400">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Deal closed - $15,000</span>
              <span className="text-sm text-gray-400">1 hour ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">AI conversation completed</span>
              <span className="text-sm text-gray-400">3 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-3 rounded-lg transition-all duration-200">
              Add Lead
            </button>
            <button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-3 rounded-lg transition-all duration-200">
              Create Deal
            </button>
            <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-3 rounded-lg transition-all duration-200">
              Start Campaign
            </button>
            <button className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 p-3 rounded-lg transition-all duration-200">
              AI Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change, positive }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-400">{icon}</div>
        <span className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
};

export default Dashboard;
