import React, { useState } from "react";

const CreateCampaignForm = () => {
  const campaignTypes = [
    { value: "lead_generation", label: "Lead Generation" },
    { value: "nurture", label: "Nurture Campaign" },
    { value: "retargeting", label: "Retargeting" },
    { value: "brand_awareness", label: "Brand Awareness" },
  ];

  const channels = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "direct_mail", label: "Direct Mail" },
    { value: "social_media", label: "Social Media" },
  ];

  const propertyTypes = [
    { value: "single_family", label: "Single Family" },
    { value: "multi_family", label: "Multi Family" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "land", label: "Land" },
    { value: "commercial", label: "Commercial" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="space-y-8">
            {/* Campaign Basic Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Campaign Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="e.g., Austin Distressed Properties Q3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Type *
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300">
                    {campaignTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Channel *
                  </label>
                  <select
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    required
                  >
                    {channels.map((channel) => (
                      <option key={channel.value} value={channel.value}>
                        {channel.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="1000.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scheduled Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Target Criteria */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Target Criteria
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="e.g., Austin, TX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300">
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Equity *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="50000"
                  />
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Email Content
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="We Buy Houses Fast - Cash Offer in 24 Hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Content *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Hello [FIRST_NAME], we specialize in buying houses..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    You can use placeholders like [FIRST_NAME], [LAST_NAME],
                    [ADDRESS] for personalization
                  </p>
                </div>
              </div>
            </div>

            {/* AI Personalization */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                AI Features
              </h2>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="use_ai_personalization"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="use_ai_personalization"
                  className="text-sm font-medium text-gray-700"
                >
                  Use AI Personalization
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Enable AI-powered personalization to automatically customize
                messages based on recipient data
              </p>
            </div>

            {/* Campaign Summary */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Campaign Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <p className="font-semibold text-blue-800 capitalize">
                    Lead Generation
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Channel:</span>
                  <p className="font-semibold text-blue-800 capitalize">
                    Email
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Budget:</span>
                  <p className="font-semibold text-green-800">$ 1000.0</p>
                </div>
                <div>
                  <span className="text-gray-600">AI Personalization:</span>
                  <p className="font-semibold text-blue-800">
                    Enabled
                    {/* {formData.use_ai_personalization ? "Enabled" : "Disabled"} */}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button className="px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignForm;
