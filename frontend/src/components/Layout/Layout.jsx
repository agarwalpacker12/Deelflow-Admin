import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const topLevelNavLinks = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/analytics", label: "Analytics" },
  { to: "/app/content-management", label: "Content Management" },
];

const marketplaceNavLinks = [
  { to: "/app/live-activity", label: "Live Feed" },
  { to: "/app/properties", label: "Properties" },
  { to: "/app/deals", label: "Deals" },
];

const marketingHubNavLinks = [
  { to: "/app/campaigns", label: "Campaigns" },
  { to: "/app/leads", label: "Leads" },
  { to: "/app/clients", label: "Clients" },
  { to: "/app/marketing/advanced", label: "Advanced" },
];

const settingsNavLinks = [
  { to: "/app/ai-features", label: "AI Settings" },
  { to: "/app/settings", label: "General Settings" },
];

const saasSettingsNavLinks = [
  { to: "/app/tenant-management", label: "Tenant Management" },
  { to: "/app/user-management", label: "User Management" },
  { to: "/app/role-management", label: "Role Management" },
];


const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [isMarketplaceExpanded, setIsMarketplaceExpanded] = useState(false);
  const [isMarketingHubExpanded, setIsMarketingHubExpanded] = useState(false);
  const [isSaasSettingsExpanded, setIsSaasSettingsExpanded] = useState(false);

  // Check if any of the "Settings" submenu items are currently active
  const isSettingsActive = settingsNavLinks.some(link => location.pathname.startsWith(link.to)) ||
                           saasSettingsNavLinks.some(link => location.pathname.startsWith(link.to));

  // Check if any of the "Marketplace" submenu items are currently active
  const isMarketplaceActive = marketplaceNavLinks.some(link => location.pathname.startsWith(link.to));
  
  // Check if any of the "Marketing Hub" submenu items are currently active
  const isMarketingHubActive = marketingHubNavLinks.some(link => location.pathname.startsWith(link.to));
  
  // Check if any of the "SaaS Settings" submenu items are currently active
  const isSaasSettingsActive = saasSettingsNavLinks.some(link => location.pathname.startsWith(link.to));
  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Sidebar */}
      <aside className="bg-[#18192a] flex flex-col items-start px-8 py-6 min-h-screen">
        <Link to="/" className="text-white text-2xl font-bold mb-8">
          {/* DealFlow */}
          <img src="../../public/logo.jpeg" alt="Logo" />
        </Link>
        {/* Vertical Navbar */}
        <nav className="flex flex-col gap-3 w-full">
          {/* Top Level Navigation Items */}
          {topLevelNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded text-slate-200 font-medium transition hover:bg-indigo-700 hover:text-white ${
                location.pathname.startsWith(link.to)
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Marketing Hub Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsMarketingHubExpanded(!isMarketingHubExpanded)}
              className={`px-3 py-2 rounded text-slate-200 font-medium transition hover:bg-indigo-700 hover:text-white flex items-center justify-between ${
                isMarketingHubActive ? "bg-indigo-600 text-white" : ""
              }`}
            >
              <span>Marketing Hub</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isMarketingHubExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Marketing Hub Submenu Items */}
            {isMarketingHubExpanded && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {marketingHubNavLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded text-slate-300 font-medium transition hover:bg-indigo-700 hover:text-white text-sm ${
                      location.pathname.startsWith(link.to)
                        ? "bg-indigo-600 text-white"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Marketplace Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsMarketplaceExpanded(!isMarketplaceExpanded)}
              className={`px-3 py-2 rounded text-slate-200 font-medium transition hover:bg-indigo-700 hover:text-white flex items-center justify-between ${
                isMarketplaceActive ? "bg-indigo-600 text-white" : ""
              }`}
            >
              <span>Marketplace</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isMarketplaceExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Marketplace Submenu Items */}
            {isMarketplaceExpanded && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {marketplaceNavLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded text-slate-300 font-medium transition hover:bg-indigo-700 hover:text-white text-sm ${
                      location.pathname.startsWith(link.to)
                        ? "bg-indigo-600 text-white"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Settings Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
              className={`px-3 py-2 rounded text-slate-200 font-medium transition hover:bg-indigo-700 hover:text-white flex items-center justify-between ${
                isSettingsActive ? "bg-indigo-600 text-white" : ""
              }`}
            >
              <span>Settings</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isSettingsExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Settings Submenu Items */}
            {isSettingsExpanded && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {settingsNavLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded text-slate-300 font-medium transition hover:bg-indigo-700 hover:text-white text-sm ${
                      location.pathname.startsWith(link.to)
                        ? "bg-indigo-600 text-white"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* SaaS Settings Dropdown */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsSaasSettingsExpanded(!isSaasSettingsExpanded)}
                    className={`px-3 py-2 rounded text-slate-300 font-medium transition hover:bg-indigo-700 hover:text-white flex items-center justify-between text-sm ${
                      isSaasSettingsActive ? "bg-indigo-600 text-white" : ""
                    }`}
                  >
                    <span>SaaS Settings</span>
                    <svg
                      className={`w-3 h-3 transition-transform ${
                        isSaasSettingsExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* SaaS Settings Submenu Items */}
                  {isSaasSettingsExpanded && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {saasSettingsNavLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`px-3 py-2 rounded text-slate-400 font-medium transition hover:bg-indigo-700 hover:text-white text-xs ${
                            location.pathname.startsWith(link.to)
                              ? "bg-indigo-600 text-white"
                              : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center min-h-screen w-full">
        {/* Fixed Profile Icon Button */}
        <div className="absolute top-6 right-8 z-20">
          <button
            onClick={() => navigate("/app/profile")}
            className="rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 shadow p-1 hover:scale-105 transition border border-slate-200"
            title="Go to Profile"
            aria-label="Go to Profile"
          >
            <span className="block bg-white rounded-full p-1">
              {/* Elegant User Avatar SVG */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15"
                  stroke="url(#profile-gradient)"
                  strokeWidth="2"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="profile-gradient"
                    x1="0"
                    y1="0"
                    x2="32"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <ellipse
                  cx="16"
                  cy="13"
                  rx="5"
                  ry="5.5"
                  fill="#6366f1"
                  fillOpacity="0.15"
                />
                <ellipse cx="16" cy="13" rx="3.5" ry="3.5" fill="#6366f1" />
                <path
                  d="M8.5 24c1.5-3 5-4 7.5-4s6 1 7.5 4"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </button>
        </div>
        {/* Card-like wrapper for content */}
        <div className="w-full p-6 pt-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
