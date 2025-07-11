const CampaignsTable = () => {
  // Mock data for campaigns
  const mockCampaigns = [
    {
      id: 1,
      user_id: 1,
      name: "Austin Distressed Properties Q3",
      campaign_type: "lead_generation",
      channel: "email",
      target_criteria: {
        location: "Austin, TX",
        property_type: "single_family",
        equity_min: 50000,
      },
      subject_line: "We Buy Houses Fast - Cash Offer in 24 Hours",
      status: "active",
      scheduled_at: "2025-06-27T09:00:00.000000Z",
      total_recipients: 500,
      sent_count: 450,
      open_count: 135,
      click_count: 45,
      response_count: 12,
      conversion_count: 3,
      budget: 1000.0,
      spent: 750.0,
      created_at: "2025-06-26T20:00:00.000000Z",
      updated_at: "2025-06-26T20:00:00.000000Z",
    },
    {
      id: 2,
      user_id: 1,
      name: "Dallas Investment Opportunities",
      campaign_type: "nurture",
      channel: "sms",
      target_criteria: {
        location: "Dallas, TX",
        property_type: "multi_family",
        equity_min: 75000,
      },
      subject_line: "Investment Properties in Dallas - Limited Time",
      status: "paused",
      scheduled_at: "2025-07-01T10:00:00.000000Z",
      total_recipients: 300,
      sent_count: 280,
      open_count: 95,
      click_count: 28,
      response_count: 8,
      conversion_count: 2,
      budget: 800.0,
      spent: 620.0,
      created_at: "2025-06-25T15:30:00.000000Z",
      updated_at: "2025-06-25T15:30:00.000000Z",
    },
    {
      id: 3,
      user_id: 1,
      name: "Houston Foreclosure Alerts",
      campaign_type: "lead_generation",
      channel: "email",
      target_criteria: {
        location: "Houston, TX",
        property_type: "single_family",
        equity_min: 40000,
      },
      subject_line: "Foreclosure Alert - Act Fast on These Properties",
      status: "completed",
      scheduled_at: "2025-06-20T08:00:00.000000Z",
      total_recipients: 750,
      sent_count: 750,
      open_count: 225,
      click_count: 67,
      response_count: 18,
      conversion_count: 5,
      budget: 1500.0,
      spent: 1500.0,
      created_at: "2025-06-19T12:00:00.000000Z",
      updated_at: "2025-06-19T12:00:00.000000Z",
    },
    {
      id: 4,
      user_id: 1,
      name: "San Antonio Rehab Projects",
      campaign_type: "retargeting",
      channel: "direct_mail",
      target_criteria: {
        location: "San Antonio, TX",
        property_type: "single_family",
        equity_min: 30000,
      },
      subject_line: "Transform Your Property Investment Today",
      status: "draft",
      scheduled_at: "2025-07-10T14:00:00.000000Z",
      total_recipients: 0,
      sent_count: 0,
      open_count: 0,
      click_count: 0,
      response_count: 0,
      conversion_count: 0,
      budget: 1200.0,
      spent: 0.0,
      created_at: "2025-06-28T09:15:00.000000Z",
      updated_at: "2025-06-28T09:15:00.000000Z",
    },
    {
      id: 5,
      user_id: 1,
      name: "Fort Worth Cash Buyers",
      campaign_type: "lead_generation",
      channel: "email",
      target_criteria: {
        location: "Fort Worth, TX",
        property_type: "condo",
        equity_min: 25000,
      },
      subject_line: "Cash Buyers Looking for Condos in Fort Worth",
      status: "active",
      scheduled_at: "2025-06-30T11:00:00.000000Z",
      total_recipients: 400,
      sent_count: 350,
      open_count: 98,
      click_count: 31,
      response_count: 9,
      conversion_count: 2,
      budget: 900.0,
      spent: 650.0,
      created_at: "2025-06-27T16:45:00.000000Z",
      updated_at: "2025-06-27T16:45:00.000000Z",
    },
  ];

 
  

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "paused":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "draft":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const calculateOpenRate = (open_count, sent_count) => {
    if (sent_count === 0) return 0;
    return ((open_count / sent_count) * 100).toFixed(1);
  };

  const calculateClickRate = (click_count, sent_count) => {
    if (sent_count === 0) return 0;
    return ((click_count / sent_count) * 100).toFixed(1);
  };

  const calculateConversionRate = (conversion_count, sent_count) => {
    if (sent_count === 0) return 0;
    return ((conversion_count / sent_count) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Marketing Campaigns</h1>
          <div className="text-sm text-gray-400">
            Total: {mockCampaigns.length} Campaigns
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Campaign Type */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Campaign Type
              </label>
              <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white">
                <option value="">All Types</option>
                <option value="lead_generation">Lead Generation</option>
                <option value="nurture">Nurture</option>
                <option value="retargeting">Retargeting</option>
                <option value="brand_awareness">Brand Awareness</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Status</label>
              <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Channel */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Channel
              </label>
              <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white">
                <option value="">All Channels</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="direct_mail">Direct Mail</option>
                <option value="social_media">Social Media</option>
              </select>
            </div>

            {/* Per Page */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Per Page
              </label>
              <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white">
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
            </div>

            {/* Reset Button */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Actions
              </label>
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
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Click Rate
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Spent
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {mockCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-white text-sm font-medium">
                          {campaign.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {campaign.target_criteria.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white text-xs capitalize">
                      {campaign.campaign_type.replace("_", " ")}
                    </td>
                    <td className="px-4 py-4 text-white text-xs capitalize">
                      {campaign.channel.replace("_", " ")}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border capitalize ${getStatusColor(
                          campaign.status
                        )}`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-white text-xs">
                        {campaign.sent_count}/{campaign.total_recipients}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-white text-xs">
                        {calculateOpenRate(
                          campaign.open_count,
                          campaign.sent_count
                        )}
                        %
                      </div>
                      <div className="text-gray-400 text-xs">
                        {campaign.open_count} opens
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-white text-xs">
                        {calculateClickRate(
                          campaign.click_count,
                          campaign.sent_count
                        )}
                        %
                      </div>
                      <div className="text-gray-400 text-xs">
                        {campaign.click_count} clicks
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-white text-xs">
                        {calculateConversionRate(
                          campaign.conversion_count,
                          campaign.sent_count
                        )}
                        %
                      </div>
                      <div className="text-gray-400 text-xs">
                        {campaign.conversion_count} conversions
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white text-xs">
                      {formatCurrency(campaign.budget)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-white text-xs">
                        {formatCurrency(campaign.spent)}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                        used
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium">
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
              Showing 1 to {mockCampaigns.length} of {mockCampaigns.length}{" "}
              campaigns
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
    </div>
  );
};

export default CampaignsTable;
