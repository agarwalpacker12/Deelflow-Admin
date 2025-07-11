const EditAiConversationForm = () => {
  const milestoneTypes = [
    { value: "", label: "Select Milestone Type" },
    { value: "inspection", label: "Property Inspection" },
    { value: "appraisal", label: "Property Appraisal" },
    { value: "financing", label: "Financing Approval" },
    { value: "title_search", label: "Title Search" },
    { value: "contract_review", label: "Contract Review" },
    { value: "closing_preparation", label: "Closing Preparation" },
    { value: "final_walkthrough", label: "Final Walkthrough" },
    { value: "closing", label: "Closing" },
    { value: "assignment", label: "Assignment" },
    { value: "marketing", label: "Marketing" },
    { value: "buyer_approval", label: "Buyer Approval" },
    { value: "document_signing", label: "Document Signing" },
    { value: "other", label: "Other" },
  ];

  // Mock deals data for the dropdown
  const availableDeals = [
    { id: 1, address: "123 Main St", deal_type: "assignment" },
    { id: 2, address: "456 Oak Ave", deal_type: "wholesale" },
    { id: 3, address: "789 Pine Rd", deal_type: "fix_and_flip" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="space-y-8">
          {/* Deal Selection Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Deal Selection
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Deal *
                </label>
                <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300">
                  <option value="">Choose a deal...</option>
                  {availableDeals.map((deal) => (
                    <option key={deal.id} value={deal.id}>
                      Deal #{deal.id} - {deal.address} ({deal.deal_type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Or Enter Deal ID *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                  placeholder="Enter deal ID"
                />
              </div>
            </div>
          </div>

          {/* Milestone Information Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Milestone Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Milestone Type *
                </label>
                <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300">
                  {milestoneTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                  placeholder="Enter milestone title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                  placeholder="Enter detailed description of this milestone..."
                />
              </div>
            </div>
          </div>

          {/* Milestone Settings Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Milestone Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_critical"
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label
                  htmlFor="is_critical"
                  className="text-sm font-medium text-gray-700"
                >
                  Critical Milestone
                </label>
                <span className="text-xs text-gray-500 ml-2">
                  (This milestone is essential for deal completion)
                </span>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-yellow-500 text-xl">⚠️</div>
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-800">
                      Critical Milestone Information
                    </h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Critical milestones are essential checkpoints that must be
                      completed for the deal to proceed successfully. These will
                      be highlighted in your dashboard and may trigger alerts if
                      approaching their due dates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Preview Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Milestone Preview
            </h2>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="font-semibold text-gray-900">
                    Property Inspection
                  </h3>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                    Critical
                  </span>
                </div>
                <span className="text-sm text-gray-500">Due: July 1, 2025</span>
              </div>
              <p className="text-gray-600 text-sm">
                Schedule and complete property inspection
              </p>
              <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                <span>Deal #1</span>
                <span>•</span>
                <span>Type: inspection</span>
                <span>•</span>
                <span>Status: Pending</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button className="px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl">
              Create Milestone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAiConversationForm;
