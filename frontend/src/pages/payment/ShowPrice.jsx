import { Check, ArrowLeft } from "lucide-react";

function ShowPrice({ handlePlanSelect }) {
  return (
    <>
      <div className="flex items-center justify-center min-h-full">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-6 px-6 rounded-t-xl shadow-lg relative">
            <button
              onClick={() => setShowPricing(false)}
              className="absolute left-4 top-6 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold mb-2">Choose Your Plan</h1>
            <p className="text-purple-100">
              Select a subscription plan that works for you
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="bg-white/95 backdrop-blur-sm rounded-b-xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-4 space-y-4">
              {/* Starter Plan */}
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Starter
                  </h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-purple-800">
                    $257
                  </span>
                  <span className="text-gray-600 ml-2">per month</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      100 API Requests
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Advanced Workflow Creation
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">Email Support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Standard Support
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handlePlanSelect("Starter", "$257/month")}
                  className="w-full bg-purple-200 text-purple-800 py-2 rounded-lg font-medium hover:bg-purple-300 transition-colors"
                >
                  Select Plan
                </button>
              </div>

              {/* Professional Plan - Most Popular */}
              <div className="border-2 border-purple-500 rounded-lg p-4 bg-gradient-to-br from-purple-600 to-purple-700 text-white relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    MOST POPULAR
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3 mt-2">
                  <h3 className="text-lg font-semibold">Professional</h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$597</span>
                  <span className="text-purple-100 ml-2">per month</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-200 mr-3" />
                    <span className="text-sm">Everything in Starter</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-200 mr-3" />
                    <span className="text-sm">Advanced Workflow Creation</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-200 mr-3" />
                    <span className="text-sm">Priority Support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-200 mr-3" />
                    <span className="text-sm">Custom Requests</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-200 mr-3" />
                    <span className="text-sm">Multiple User Access</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-200 mr-3" />
                    <span className="text-sm">Advanced Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-200 mr-3" />
                    <span className="text-sm">API Access</span>
                  </div>
                </div>
                <button
                  onClick={() => handlePlanSelect("Professional", "$597/month")}
                  className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  Select Plan
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enterprise
                  </h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-purple-800">
                    $2997
                  </span>
                  <span className="text-gray-600 ml-2">per month</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      White Label Solution
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Custom AI Training
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Dedicated Account Manager
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Custom Integrations
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handlePlanSelect("Enterprise", "$2997/month")}
                  className="w-full bg-purple-200 text-purple-800 py-2 rounded-lg font-medium hover:bg-purple-300 transition-colors"
                >
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Footer Link */}
            <div className="text-center py-4 border-t border-purple-200">
              <button
                onClick={() => setShowPricing(false)}
                className="text-purple-600 text-sm hover:underline"
              >
                Go back to previous step
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-white/70">
              © 2025 WholesaleAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowPrice;
