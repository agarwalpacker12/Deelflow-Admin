import React from "react";
import MainContentWrapper from "../../components/Layout/MainContentWrapper";

const BillingSubscription = () => {
  return (
    <MainContentWrapper>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Billing & Subscription
          </h1>
          <p className="text-slate-300">
            Manage your subscription, invoices, and payment methods
          </p>
        </div>

        {/* Current Subscription Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-xl font-semibold text-white">
              Current Subscription
            </h2>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-500/25">
              Change Plan
            </button>
          </div>

          {/* Professional Plan Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Professional Plan
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-500/30">
                    Active
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">$599</div>
                <div className="text-slate-400 text-sm">
                  per month, billed monthly
                </div>
              </div>
            </div>

            {/* User Licenses Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-300 font-medium">
                  User Licenses
                </span>
                <span className="text-slate-400 text-sm">24 of 50 used</span>
              </div>
              <div className="relative">
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                    style={{ width: "48%" }}
                  ></div>
                </div>
                <div className="text-right mt-2">
                  <span className="text-slate-400 text-xs">
                    26 seats available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Details */}
          <div className="border-t border-slate-700/50 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-300">Next billing date</span>
                  <span className="text-white font-medium">
                    February 15, 2025
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-300">Billing cycle</span>
                  <span className="text-white font-medium">Monthly</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Management Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10  mt-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-white">
              Billing Management
            </h2>
            <button className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-purple-500/25">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Manage Billing Settings
            </button>
          </div>

          {/* Payment Method Section */}
          {/* <div className="mb-8 p-6 bg-slate-700/30 rounded-xl border border-slate-600/30"> */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-slate-300 text-sm font-medium mb-2">
                  Payment Method
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-lg">
                    •••• 4242 (Visa)
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors duration-200">
                Update
              </button>
            </div>
          </div>

          {/* Billing Details and Tax Settings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Billing Details Card */}
            {/* <div className="bg-slate-700/30 rounded-xl border border-slate-600/30 p-6 hover:bg-slate-700/40 transition-all duration-300 cursor-pointer group"> */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Billing Details
                </h3>
                <p className="text-slate-400 text-sm">
                  Update billing information
                </p>
              </div>
            </div>

            {/* Tax Settings Card */}
            {/* <div className="bg-slate-700/30 rounded-xl border border-slate-600/30 p-6 hover:bg-slate-700/40 transition-all duration-300 cursor-pointer group"> */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Tax Settings
                </h3>
                <p className="text-slate-400 text-sm">Manage tax information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Invoices Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group mt-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-white">
              Recent Invoices
            </h2>
            <button className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors duration-200">
              View All
            </button>
          </div>

          {/* Invoice Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10 border-b border-white/10">
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">
                    Invoice
                  </th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">
                    Date
                  </th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">
                    Amount
                  </th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">
                    Status
                  </th>
                  <th className="text-left py-4 px-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                  <td className="py-4 px-2 text-white font-medium">
                    INV-12345
                  </td>
                  <td className="py-4 px-2 text-slate-300">Jan 15, 2025</td>
                  <td className="py-4 px-2 text-white font-semibold">
                    $599.00
                  </td>
                  <td className="py-4 px-2">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-500/30">
                      Paid
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200">
                      Download
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                  <td className="py-4 px-2 text-white font-medium">
                    INV-12344
                  </td>
                  <td className="py-4 px-2 text-slate-300">Dec 15, 2024</td>
                  <td className="py-4 px-2 text-white font-semibold">
                    $599.00
                  </td>
                  <td className="py-4 px-2">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-500/30">
                      Paid
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Activate Windows Notice */}
          <div className="mt-6 flex justify-end">
            <div className="text-right">
              <div className="text-slate-400 text-sm font-medium">
                Activate Windows
              </div>
              <div className="text-slate-500 text-xs">
                Go to Settings to activate Windows.
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};

export default BillingSubscription;
