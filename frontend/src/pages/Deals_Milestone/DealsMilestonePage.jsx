// No imports needed for design-only version

const DealsMileStonePage = () => {
  // Mock data for display
  const mockProperties = [
    {
      deal_id: 1,
      milestone_type: "inspection",
      title: "Property Inspection",
      description: "Schedule and complete property inspection",
      due_date: "2025-07-01",
      is_critical: true,
    },
    {
      deal_id: 2,
      milestone_type: "appraisal",
      title: "Property Appraisal",
      description: "Obtain professional property appraisal",
      due_date: "2025-07-15",
      is_critical: true,
    },
    {
      deal_id: 3,
      milestone_type: "financing",
      title: "Secure Financing",
      description: "Finalize loan approval and funding",
      due_date: "2025-08-01",
      is_critical: true,
    },
    {
      deal_id: 4,
      milestone_type: "title_search",
      title: "Title Search",
      description: "Complete title search and resolve any issues",
      due_date: "2025-07-20",
      is_critical: false,
    },
    {
      deal_id: 5,
      milestone_type: "inspection",
      title: "Final Walkthrough",
      description: "Conduct final property walkthrough",
      due_date: "2025-08-10",
      is_critical: true,
    },
    {
      deal_id: 6,
      milestone_type: "closing",
      title: "Contract Signing",
      description: "Sign purchase agreement and contracts",
      due_date: "2025-06-25",
      is_critical: true,
    },
    {
      deal_id: 7,
      milestone_type: "documentation",
      title: "Document Review",
      description: "Review all closing documents",
      due_date: "2025-07-30",
      is_critical: false,
    },
    {
      deal_id: 8,
      milestone_type: "closing",
      title: "Property Closing",
      description: "Complete property closing process",
      due_date: "2025-08-15",
      is_critical: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Deal Milestones</h1>
        <div className="text-sm text-gray-400">
          Total: {mockProperties.length} Milestones
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {/* Milestone Type */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Milestone Type
            </label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white">
              <option value="">All Types</option>
              <option value="inspection">Inspection</option>
              <option value="appraisal">Appraisal</option>
              <option value="financing">Financing</option>
              <option value="closing">Closing</option>
              <option value="documentation">Documentation</option>
            </select>
          </div>

          {/* Due Date From */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Due Date From
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-60"
            />
          </div>

          {/* Per Page */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Per Page</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white">
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </div>

          {/* Reset Button */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Actions</label>
            <button className="w-full px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-colors flex items-center justify-center gap-2">
              <span>↻</span>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Deal ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Milestone Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Critical
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {mockProperties.map((milestone) => (
                <tr
                  key={milestone.deal_id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-white text-xs">
                    {milestone.deal_id}
                  </td>
                  <td className="px-6 py-4 text-white text-xs capitalize">
                    {milestone.milestone_type}
                  </td>
                  <td className="px-6 py-4 text-white text-xs font-medium">
                    {milestone.title}
                  </td>
                  <td className="px-6 py-4 text-white text-xs max-w-xs truncate">
                    {milestone.description}
                  </td>
                  {/* <td className="px-6 py-4 text-white text-xs">
                    {milestone.due_date}
                  </td> */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                        milestone.is_critical
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                      }`}
                    >
                      {milestone.is_critical ? "Critical" : "Normal"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 rounded text-xs">
                        View
                      </button>
                      <button className="text-green-400 hover:text-green-300 transition-colors px-2 py-1 rounded text-xs">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded text-xs">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing 1 to {mockProperties.length} of {mockProperties.length}{" "}
            milestones
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <span>‹</span>
            </button>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded-lg text-sm transition-colors bg-blue-500 text-white">
                1
              </button>
            </div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <span>›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsMileStonePage;
