const AddDealsForm = () => {
  const dealTypes = [
    { value: "", label: "Select Deal Type" },
    { value: "assignment", label: "Assignment" },
    { value: "wholesale", label: "Wholesale" },
    { value: "fix_and_flip", label: "Fix & Flip" },
    { value: "buy_and_hold", label: "Buy & Hold" },
    { value: "direct_sale", label: "Direct Sale" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Add New Deal
            </h1>
            <p className="text-gray-600">
              Create and manage your real estate deal information
            </p>
          </div> */}

          <div className="space-y-8">
            {/* Deal Information Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Deal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property ID *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter property ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead ID *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter lead ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deal Type *
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300">
                    {dealTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buyer ID *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter buyer ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seller ID *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter seller ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inspection Period (days)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter inspection period"
                  />
                </div>
              </div>
            </div>

            {/* Financial Details Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Financial Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter purchase price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter sale price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assignment Fee
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter assignment fee"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Earnest Money
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter earnest money"
                  />
                </div>
              </div>

              {/* Financial Summary */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Deal Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Purchase:</span>
                    <p className="font-semibold text-blue-800">$180,000.00</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Sale:</span>
                    <p className="font-semibold text-green-800">$195,000.00</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Assignment Fee:</span>
                    <p className="font-semibold text-purple-800">$15,000.00</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Profit:</span>
                    <p className="font-semibold text-green-800">$15,000.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Timeline
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contract Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Closing Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Contract Terms Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contract Terms
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="financing_contingency"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="financing_contingency"
                    className="text-sm font-medium text-gray-700"
                  >
                    Financing Contingency
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="inspection_contingency"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="inspection_contingency"
                    className="text-sm font-medium text-gray-700"
                  >
                    Inspection Contingency
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="appraisal_contingency"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="appraisal_contingency"
                    className="text-sm font-medium text-gray-700"
                  >
                    Appraisal Contingency
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Notes Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Notes
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deal Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter any additional notes about this deal..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Conditions
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black border-gray-300"
                    placeholder="Enter any special conditions or requirements..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button className="px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl">
                Create Deal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDealsForm;
