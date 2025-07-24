import React, { useState, useEffect } from "react";
import { campaignsAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Plus,
  Sparkles,
} from "lucide-react";

const CampaignsPage = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          page: currentPage,
          per_page: perPage,
        };
        if (typeFilter) params.campaign_type = typeFilter;

        const response = await campaignsAPI.getCampaigns(params);
        if (response.data.status === "success") {
          setCampaigns(response.data.data.data);
          setTotal(response.data.data.meta.total);
          setTotalPages(response.data.data.meta.last_page);
        } else {
          setError("Failed to fetch campaigns");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch campaigns");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [
    typeFilter,
    // statusFilter,
    // channelFilter,
    // perPage,
    // currentPage,
  ]);

  const resetFilters = () => {
    setTypeFilter("");
  };

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
          <div className="flex items-center gap-3">
            {/* Add Campaign Button */}
            <button
              onClick={() => navigate("/app/campaigns/add")}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              <Plus className="h-5 w-5" />
              <span className="relative z-10">Add Campaign</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
            </button>
            <div className="text-sm text-gray-400">
              Total: {total} campaigns
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Campaign Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white"
              >
                <option value="">All Types</option>
                <option value="seller_finder">Seller Finder</option>
                <option value="buyer_finder">Buyer Finder</option>
              </select>
            </div>

            {/* Reset Button */}
            <div>
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-300">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
            <p className="text-green-300">{success}</p>
          </div>
        )}

        {/* Table */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">
              Loading campaigns...
            </div>
          ) : campaigns.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No campaigns found
            </div>
          ) : (
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
                  {campaigns.map((campaign) => (
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
                            {campaign.target_criteria?.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-white text-xs capitalize">
                        {campaign.campaign_type?.replace("_", " ")}
                      </td>
                      <td className="px-4 py-4 text-white text-xs capitalize">
                        {campaign.channel?.replace("_", " ")}
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
                          {((campaign.spent / campaign.budget) * 100).toFixed(
                            0
                          )}
                          % used
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
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {(currentPage - 1) * perPage + 1} to{" "}
                {Math.min(currentPage * perPage, total)} of {total} campaigns
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
