import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/campaigns", label: "Campaigns" },
  { to: "/app/leads", label: "Leads" },
  { to: "/app/properties", label: "Properties" },
  // { to: "/app/deals", label: "Deals" },
  // { to: "/app/milestone", label: "Milestone" },
  // { to: "/app/ai-assistant", label: "AI-Assistant" },
  // { to: "/app/recipients", label: "Recipients" },
  // { to: "/app/achievements", label: "Achievements" },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr] bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Sidebar */}
      <aside className="bg-[#18192a] flex flex-col items-start px-8 py-6 min-h-screen">
        <Link to="/" className="text-white text-2xl font-bold mb-8">
          {/* DealFlow */}
          <img src="../../public/logo.jpeg" alt="Logo" />
        </Link>
        {/* Vertical Navbar */}
        <nav className="flex flex-col gap-3 w-full">
          {navLinks.map((link) => (
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
