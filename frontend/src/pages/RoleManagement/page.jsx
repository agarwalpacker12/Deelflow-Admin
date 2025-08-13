import React, { useEffect } from "react";
import StaticComponent from "./StaticComponent";
import MainContentWrapper from "../../components/Layout/MainContentWrapper";
import { RbacAPI } from "../../services/api";

const RoleManagementPage = () => {
  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const response = await RbacAPI.getPermissions();
        console.log("101", response.data);

        // Handle the API response format
        if (response.data.status === "success") {
          // console.log(response.data.data);
          // setInvitationRes(response.data.data); // leads array
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };

    fetchInvitation();
  }, []);

  return (
    <MainContentWrapper>
      <div className="max-w-7xl mx-auto space-y-8">
        <StaticComponent />

        {/* Granular Permission Management */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Granular Permission Management
            </h2>
            {/* <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
              Save Changes
            </button> */}
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-white font-semibold">
                      Module / Permission
                    </th>
                    <th className="text-center p-4 text-white font-semibold min-w-[140px]">
                      Super Admin
                    </th>
                    <th className="text-center p-4 text-white font-semibold min-w-[160px]">
                      Organization Admin
                    </th>
                    <th className="text-center p-4 text-white font-semibold min-w-[170px]">
                      Organization Member
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Manage All Tenants
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      View Tenant Analytics
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Manage Subscriptions
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 pl-12 text-slate-300">
                      Platform Configuration
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-green-500 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-green-400">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-11 h-6 bg-slate-600 rounded-full mx-auto relative cursor-pointer transition-all hover:bg-slate-500">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};

export default RoleManagementPage;
