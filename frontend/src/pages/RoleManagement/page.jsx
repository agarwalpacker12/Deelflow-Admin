import React from "react";
import SystemRole from "./SystemRole";
import Permission from "./Permission";

const RoleManagementPage = () => {
  const stats = [
    {
      value: "12",
      label: "Total Tenants",
      color: "text-blue-400",
    },
    {
      value: "156",
      label: "Total Users",
      color: "text-blue-400",
    },
    {
      value: "3",
      label: "System Roles",
      color: "text-blue-400",
    },
    {
      value: "89%",
      label: "Active Tenants",
      color: "text-blue-400",
      isWide: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Top row with 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.slice(0, 3).map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row with 1 wider card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${stats[3].color}`}>
                {stats[3].value}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stats[3].label}
              </div>
            </div>
          </div>
        </div>

        {/* System Roles Overview */}
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-6">
            System Roles Overview
          </h2>

          <SystemRole />
        </div>

        {/* Granular Permission Management */}

        <Permission />

        {/* Activate Windows Notice */}
        <div className="text-right">
          <div className="text-gray-500 text-sm">
            <div>Activate Windows</div>
            <div>Go to Settings to activate Windows.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPage;
