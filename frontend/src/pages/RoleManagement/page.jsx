import React from "react";

const RoleManagementPage = () => {
  const stats = [
    {
      value: "12",
      label: "Total Tenants",
      color: "text-indigo-400",
    },
    {
      value: "156",
      label: "Total Users",
      color: "text-purple-400",
    },
    {
      value: "3",
      label: "System Roles",
      color: "text-blue-400",
    },
    {
      value: "89%",
      label: "Active Tenants",
      color: "text-green-400",
      isWide: true,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Role Management
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Roles Overview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              System Roles Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Super Admin Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 relative hover:border-red-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-t-xl"></div>

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white text-xl font-bold">Super Admin</h3>
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  System Role
                </span>
              </div>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Platform-wide administrator with complete system control.
                Manages all tenants, subscriptions, and platform configuration.
                No operational capabilities.
              </p>

              <div className="space-y-4">
                <h4 className="text-white text-sm font-semibold mb-3">
                  Administrative Powers
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Tenant Management
                  </span>
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Subscription Control
                  </span>
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Platform Analytics
                  </span>
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    System Configuration
                  </span>
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Role Management
                  </span>
                </div>
              </div>
            </div>

            {/* Organization Admin Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 relative hover:border-purple-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-xl"></div>

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white text-xl font-bold">
                  Organization Admin
                </h3>
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Organization Admin
                </span>
              </div>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Organization administrator with full control over their tenant.
                Manages users, settings, and has complete operational
                capabilities within their organization.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-white text-sm font-semibold mb-3">
                    Administrative
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                      User Management
                    </span>
                    <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                      Organization Settings
                    </span>
                    <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                      Billing Management
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-white text-sm font-semibold mb-3">
                    Operational
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                      All Features
                    </span>
                    <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                      Campaigns
                    </span>
                    <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                      Properties
                    </span>
                    <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                      Marketplace
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Member Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 relative hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl"></div>

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white text-xl font-bold">
                  Organization Member
                </h3>
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Staff Member
                </span>
              </div>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Organization staff member with operational access. Can perform
                all business operations but has no administrative capabilities.
              </p>

              <div className="space-y-4">
                <h4 className="text-white text-sm font-semibold mb-3">
                  Operational Access
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Marketing Campaigns
                  </span>
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Lead Management
                  </span>
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Property Listings
                  </span>
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Marketplace Trading
                  </span>
                  <span className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    Analytics (Own Data)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Granular Permission Management */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Granular Permission Management
            </h2>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
              Save Changes
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-white font-semibold">
                      Module / Permission
                    </th>
                    <th className="text-center p-4 text-white font-semibold min-w-[140px]">
                      Super Admin
                    </th>
                    <th className="text-center p-4 text-white font-semibold min-w-[160px]">
                      Organization Admin
                    </th>
                    <th className="text-center p-4 text-white font-semibold min-w-[170px]">
                      Organization Member
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {/* Platform Administration */}
                  <tr className="bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center text-white font-semibold">
                        <span className="text-yellow-400 mr-3 text-lg">🏢</span>
                        Platform Administration
                      </div>
                    </td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Manage All Tenants
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      View Tenant Analytics
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Manage Subscriptions
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Platform Configuration
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>

                  {/* Organization Administration */}
                  <tr className="bg-slate-800/30">
                    <td className="p-4">
                      <div className="flex items-center text-white font-semibold">
                        <span className="text-purple-400 mr-3 text-lg">🏛️</span>
                        Organization Administration
                      </div>
                    </td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Manage Organization Users
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Organization Settings
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Billing & Invoices
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>

                  {/* Marketing Hub */}
                  <tr className="bg-slate-800/30">
                    <td className="p-4">
                      <div className="flex items-center text-white font-semibold">
                        <span className="text-green-400 mr-3 text-lg">📊</span>
                        Marketing Hub
                      </div>
                    </td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Create Campaigns
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">Manage Leads</td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Email Marketing
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>

                  {/* Marketplace */}
                  <tr className="bg-slate-800/30">
                    <td className="p-4">
                      <div className="flex items-center text-white font-semibold">
                        <span className="text-blue-400 mr-3 text-lg">🏪</span>
                        Marketplace
                      </div>
                    </td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      List Properties
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Buy/Sell Properties
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">Manage Deals</td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>

                  {/* Analytics */}
                  <tr className="bg-slate-800/30">
                    <td className="p-4">
                      <div className="flex items-center text-white font-semibold">
                        <span className="text-orange-400 mr-3 text-lg">📈</span>
                        Analytics
                      </div>
                    </td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      View Platform Analytics
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      View Organization Analytics
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">Export Reports</td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPage;
