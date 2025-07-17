import React, { useEffect, useState } from "react";
import { propertySaveAPI } from "../../services/api";

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Investor",
  phone: "+1 234 567 890",
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [savedProperty, setSavedProperty] = useState();

  // Get user details from localStorage
  let userDetails = null;
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      userDetails = JSON.parse(userStr);
    }
  } catch (e) {
    userDetails = null;
  }

  // Fallback to mockUser if no localStorage data
  const user = userDetails
    ? {
        name: `${userDetails.first_name || ""} ${
          userDetails.last_name || ""
        }`.trim(),
        email: userDetails.email || "",
        role: userDetails.role || "",
        phone: userDetails.phone || "",
      }
    : mockUser;

  // Fetch saved properties
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await propertySaveAPI.getPropertySave({
          per_page: 100,
        }); // adjust per_page as needed
        if (response.data.status === "success") {
          console.log(
            "response.data.data",
            JSON.stringify(response.data.data.data)
          );
          setSavedProperty(response.data.data.data);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchSavedProperties();
  }, []);

  return (
    <>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group focus:outline-none ${
                activeTab === "profile"
                  ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              <svg
                className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              Profile
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab("property")}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group focus:outline-none ${
                activeTab === "property"
                  ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              <svg
                className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
              </svg>
              Property
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "profile" && (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <span className="inline-block h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
              <div>
                <div className="text-xl font-medium text-black dark:text-white">
                  {user.name}
                </div>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                <p className="text-gray-500 dark:text-gray-400">
                  Role: {user.role}
                </p>
                {user.phone && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Phone: {user.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === "property" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {savedProperty && savedProperty.length > 0 ? (
                  savedProperty.map((savedItem) => (
                    <tr key={savedItem.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {savedItem.property?.id || "--"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {savedItem.property?.address || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {savedItem.property?.city || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        ${savedItem.property?.purchase_price || "0.00"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No saved properties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
