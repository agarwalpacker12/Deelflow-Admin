import React from "react";

function Permission() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-semibold">
          Granular Permission Management
        </h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Save Changes
        </button>
      </div>
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="text-left p-4 text-white font-medium">
                  Module / Permission
                </th>
                <th className="text-center p-4 text-white font-medium min-w-[140px]">
                  Super Admin
                </th>
                <th className="text-center p-4 text-white font-medium min-w-[160px]">
                  Organization Admin
                </th>
                <th className="text-center p-4 text-white font-medium min-w-[170px]">
                  Organization Member
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {/* Platform Administration */}
              <tr className="bg-gray-750">
                <td className="p-4">
                  <div className="flex items-center text-white font-medium">
                    <span className="text-yellow-400 mr-2">🏢</span>
                    Platform Administration
                  </div>
                </td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">Manage All Tenants</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">
                  View Tenant Analytics
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">
                  Manage Subscriptions
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">
                  Platform Configuration
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>

              {/* Organization Administration */}
              <tr className="bg-gray-750">
                <td className="p-4">
                  <div className="flex items-center text-white font-medium">
                    <span className="text-purple-400 mr-2">🏛️</span>
                    Organization Administration
                  </div>
                </td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">
                  Manage Organization Users
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">
                  Organization Settings
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">Billing & Invoices</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>

              {/* Marketing Hub */}
              <tr className="bg-gray-750">
                <td className="p-4">
                  <div className="flex items-center text-white font-medium">
                    <span className="text-green-400 mr-2">📊</span>
                    Marketing Hub
                  </div>
                </td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">Create Campaigns</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">Manage Leads</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">Email Marketing</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
              </tr>

              {/* Marketplace */}
              <tr className="bg-gray-750">
                <td className="p-4">
                  <div className="flex items-center text-white font-medium">
                    <span className="text-blue-400 mr-2">🏪</span>
                    Marketplace
                  </div>
                </td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">List Properties</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">Buy/Sell Properties</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">Manage Deals</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
              </tr>

              {/* Analytics */}
              <tr className="bg-gray-750">
                <td className="p-4">
                  <div className="flex items-center text-white font-medium">
                    <span className="text-orange-400 mr-2">📈</span>
                    Analytics
                  </div>
                </td>
                <td className="p-4"></td>
                <td className="p-4"></td>
                <td className="p-4"></td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">
                  View Platform Analytics
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">
                  View Organization Analytics
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-gray-600 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-4 pl-10 text-gray-300">Export Reports</td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-10 h-5 bg-green-500 rounded-full mx-auto relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Permission;
