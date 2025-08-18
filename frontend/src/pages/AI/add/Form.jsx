import React from "react";

const AddAIConversationForm = () => {
  const channelOptions = [
    { value: "", label: "Select Communication Channel" },
    { value: "sms", label: "SMS" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone Call" },
    { value: "web_chat", label: "Web Chat" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "messenger", label: "Facebook Messenger" },
    { value: "slack", label: "Slack" },
    { value: "teams", label: "Microsoft Teams" },
  ];

  // Mock data for dropdowns
  const availableLeads = [
    { id: 1, name: "John Smith", email: "john.smith@email.com" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com" },
    { id: 3, name: "Michael Davis", email: "m.davis@email.com" },
    { id: 4, name: "Emily Wilson", email: "emily.w@email.com" },
  ];

  const availableProperties = [
    { id: 1, address: "123 Main St, Downtown", type: "Residential" },
    { id: 2, address: "456 Oak Ave, Suburb", type: "Commercial" },
    { id: 3, address: "789 Pine Rd, Uptown", type: "Residential" },
    { id: 4, address: "321 Elm St, Midtown", type: "Mixed Use" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          {/* <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create AI Conversation
            </h1>
            <p className="text-gray-600">
              Initialize a new AI conversation for lead engagement
            </p>
          </div> */}

          <div className="space-y-8">
            {/* Lead Selection Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                Lead Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Lead *
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300">
                    <option value="">Choose a lead...</option>
                    {availableLeads.map((lead) => (
                      <option key={lead.id} value={lead.id}>
                        {lead.name} - {lead.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Or Enter Lead ID *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter lead ID"
                  />
                </div>
              </div>
            </div>

            {/* Property Selection Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                Property Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Property *
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300">
                    <option value="">Choose a property...</option>
                    {availableProperties.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.address} ({property.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Or Enter Property ID *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter property ID"
                  />
                </div>
              </div>
            </div>

            {/* Communication Channel Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                Communication Settings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Communication Channel *
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300">
                    {channelOptions.map((channel) => (
                      <option key={channel.value} value={channel.value}>
                        {channel.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    External Reference ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="e.g., twilio_call_123, zoom_meeting_456"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: External system reference ID for tracking
                  </p>
                </div>
              </div>
            </div>

            {/* Configuration Preview Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                Configuration Preview
              </h2>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Lead ID:
                      </span>
                      <span className="text-gray-600">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Property ID:
                      </span>
                      <span className="text-gray-600">1</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Channel:
                      </span>
                      <span className="text-gray-600">SMS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        External ID:
                      </span>
                      <span className="text-gray-600">twilio_call_123</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-500 text-xl">💡</div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-800">
                      AI Conversation Setup
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                      This will initialize a new AI conversation session linking
                      the selected lead and property through the specified
                      communication channel. The AI will have access to both
                      lead and property information for personalized
                      interactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button className="px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl">
                Create AI Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAIConversationForm;
