import React from "react";

function SystemRole() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Super Admin Card */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 rounded-t-xl"></div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="text-white text-lg font-semibold">Super Admin</h3>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            System Role
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          Platform-wide administrator with complete system control. Manages all
          tenants, subscriptions, and platform configuration. No operational
          capabilities.
        </p>

        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-3">
            Administrative Powers
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Tenant Management
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Subscription Control
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Platform Analytics
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              System Configuration
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Role Management
            </span>
          </div>
        </div>
      </div>

      {/* Organization Admin Card */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500 rounded-t-xl"></div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="text-white text-lg font-semibold">
            Organization Admin
          </h3>
          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
            Organization Admin
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          Organization administrator with full control over their tenant.
          Manages users, settings, and has complete operational capabilities
          within their organization.
        </p>

        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-3">
            Administrative
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              User Management
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Organization Settings
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Billing Management
            </span>
          </div>

          <h4 className="text-white text-sm font-medium mb-3">Operational</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              All Features
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Campaigns
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Properties
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Marketplace
            </span>
          </div>
        </div>
      </div>

      {/* Organization Member Card */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-xl"></div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="text-white text-lg font-semibold">
            Organization Member
          </h3>
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Staff Member
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          Organization staff member with operational access. Can perform all
          business operations but has no administrative capabilities.
        </p>

        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-3">
            Operational Access
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Marketing Campaigns
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Lead Management
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Property Listings
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Marketplace Trading
            </span>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Analytics (Own Data)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemRole;
