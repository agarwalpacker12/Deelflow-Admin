// No imports needed for design-only version

const DealsPage = () => {
  // Mock data for display
  const mockProperties = [
    {
      id: 1,
      deal_id: 1,
      milestone_type: "inspection",
      title: "Property Inspection",
      description: "Schedule and complete property inspection",
      due_date: "2025-07-01",
      is_critical: true,
    },
    {
      id: 2,
      deal_id: 2,
      milestone_type: "inspection",
      title: "Property Inspection",
      description: "Schedule and complete property inspection",
      due_date: "2025-07-01",
      is_critical: true,
    },
    {
      id: 3,
      deal_id: 3,
      milestone_type: "inspection",
      title: "Property Inspection",
      description: "Schedule and complete property inspection",
      due_date: "2025-07-01",
      is_critical: true,
    },
  ];

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Deals</h1>
        <div className="text-sm text-gray-400">
          Total: {mockProperties.length} Deals
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Search</label>
            <span className="absolute left-3 top-8 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Status</label>
            <span className="absolute left-3 top-8 text-gray-400">⚙️</span>
            <select className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          {/* Close Date From */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Due Date</label>
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
                  Property ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  milestone_type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  due_date
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {mockProperties.map((deal) => (
                <tr
                  key={deal.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-white text-xs">
                    {deal.deal_id}
                  </td>
                  <td className="px-6 py-4 text-white text-xs">
                    {deal.milestone_type}
                  </td>
                  <td className="px-6 py-4 text-white text-xs">{deal.title}</td>
                  <td className="px-6 py-4 text-white text-xs">
                    {deal.due_date}
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
            Showing 1 to 3 of 3 properties
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

export default DealsPage;
