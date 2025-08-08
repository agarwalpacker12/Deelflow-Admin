import React, { useState } from "react";
import { Zap, Users, Check, ArrowLeft, Shield } from "lucide-react";

export default function WholesaleAIWelcome() {
  const [showPricing, setShowPricing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePlanSelect = (planName, price) => {
    setSelectedPlan({ name: planName, price: price });
  };

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentSuccess(true);
  };

  // Payment success screen
  if (paymentSuccess) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl p-8 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>

            <p className="text-gray-600 mb-2">
              Welcome to WholesaleAI Beta! Your account has been
            </p>
            <p className="text-gray-600 mb-6">
              upgraded to the{" "}
              <span className="font-semibold text-purple-600">
                {selectedPlan?.name} Plan
              </span>
              .
            </p>

            <p className="text-gray-500 text-sm mb-8">
              Get started by exploring your new dashboard and tools
            </p>

            {/* Dashboard Button */}
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
              Go to Dashboard
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-white/70">
              © 2025 WholesaleAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Subscription completion screen
  if (selectedPlan) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl p-8">
            {/* Security Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-purple-100 p-4 rounded-full">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Complete Your Subscription
              </h1>
              <p className="text-gray-600 text-sm">
                You'll be redirected to our secure payment provider
              </p>
            </div>

            {/* Plan Details */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">
                  Selected Plan:
                </span>
                <span className="text-purple-900 font-semibold">
                  {selectedPlan.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Price:</span>
                <span className="text-purple-900 font-semibold">
                  {selectedPlan.price}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
              >
                Proceed to Payment
              </button>

              <button
                onClick={() => setSelectedPlan(null)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Go Back
              </button>
            </div>

            {/* Security Notice */}
            <div className="text-center mt-6">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2" />
                <span>Secure payment processed by Stripe</span>
              </div>
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
    );
  }

  if (showPricing) {
    return (
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
    );
  }

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-6 px-6 rounded-t-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Welcome to WholesaleAI!</h1>
          <p className="text-purple-100">
            Choose how you'd like to proceed with your account
          </p>
        </div>

        {/* Content Cards */}
        <div className="bg-white/95 backdrop-blur-sm rounded-b-xl shadow-xl border border-white/20 overflow-hidden">
          {/* Beta Tester Option */}
          <div
            className="p-6 border-b border-purple-200/50 cursor-pointer hover:bg-purple-50/50 transition-colors"
            onClick={() => setShowPricing(true)}
          >
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Become a Beta Tester
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Get immediate access to all features and help shape the future
                  of WholesaleAI with your feedback.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Immediate access
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Special beta pricing
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Priority support
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Influence product roadmap
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Waitlist Option */}
          <div className="p-6">
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Join the Waitlist
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Sign up to be notified when we're ready for more users. No
                  payment required.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Stay updated on launch
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Early access opportunity
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      No payment required
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm text-gray-700">
                      Special launch offers
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
  );
}
