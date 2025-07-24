import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { campaignSchema, DefaultValues } from "./utility"; // make sure to import this
import { useMutation } from "@tanstack/react-query";
import { campaignsAPI, leadsAPI } from "../../../services/api";
import { setLeads } from "../../../store/slices/leadsSlice";
import toast from "react-hot-toast";

const CreateCampaignForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(campaignSchema),
    defaultValues: DefaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await campaignsAPI.createCampaign(data);
      return res;
    },
    onSuccess: (data) => {
      if (!data.data.is_error) {
        toast.success("Campaign created successfully! We'll contact you soon.");
        console.log("response_Data", data);

        dispatch(setCampaigns([...leads, newLead]));
        navigate("/app/campaigns");
      } else {
        const resMsg = translateRes(data?.data?.message?.replaceAll(".", "_"));
        toast.error(resMsg);
      }
    },
    onError: (error) => {
      console.log("error", error.response.data.message);
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const campaignTypes = [
    { value: "lead_generation", label: "Lead Generation" },
    { value: "nurture", label: "Nurture Campaign" },
    { value: "retargeting", label: "Retargeting" },
    { value: "brand_awareness", label: "Brand Awareness" },
  ];

  const channels = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "direct_mail", label: "Direct Mail" },
    { value: "social_media", label: "Social Media" },
  ];

  const propertyTypes = [
    { value: "single_family", label: "Single Family" },
    { value: "multi_family", label: "Multi Family" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "land", label: "Land" },
    { value: "commercial", label: "Commercial" },
  ];

  const useAI = watch("use_ai_personalization");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Keep your exact layout */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="space-y-8">
              {/* Campaign Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Campaign Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign Name *
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                      placeholder="e.g., Austin Distressed Properties Q3"
                    />
                    <p className="text-sm text-red-500">
                      {errors.name?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign Type *
                    </label>
                    <select
                      {...register("campaign_type")}
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                    >
                      <option value="">Select</option>
                      {campaignTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-red-500">
                      {errors.campaign_type?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Channel *
                    </label>
                    <select
                      {...register("channel")}
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                    >
                      {channels.map((channel) => (
                        <option key={channel.value} value={channel.value}>
                          {channel.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-red-500">
                      {errors.channel?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget *
                    </label>
                    <input
                      {...register("budget")}
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                      placeholder="1000.00"
                    />
                    <p className="text-sm text-red-500">
                      {errors.budget?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scheduled Date & Time *
                    </label>
                    <input
                      {...register("scheduled_at")}
                      type="datetime-local"
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                    />
                    <p className="text-sm text-red-500">
                      {errors.scheduled_at?.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Target Criteria */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Target Criteria
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      {...register("target_criteria.location")}
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                      placeholder="e.g., Austin, TX"
                    />
                    <p className="text-sm text-red-500">
                      {errors.target_criteria?.location?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type *
                    </label>
                    <select
                      {...register("target_criteria.property_type")}
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                    >
                      <option value="">Select</option>
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-red-500">
                      {errors.target_criteria?.property_type?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Equity *
                    </label>
                    <input
                      {...register("target_criteria.equity_min")}
                      type="number"
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                      placeholder="50000"
                    />
                    <p className="text-sm text-red-500">
                      {errors.target_criteria?.equity_min?.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Email Content
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Line *
                    </label>
                    <input
                      {...register("subject_line")}
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                      placeholder="We Buy Houses Fast - Cash Offer in 24 Hours"
                    />
                    <p className="text-sm text-red-500">
                      {errors.subject_line?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Content *
                    </label>
                    <textarea
                      {...register("email_content")}
                      rows={6}
                      className="w-full px-4 py-3 border rounded-lg text-black border-gray-300"
                      placeholder="Hello [FIRST_NAME], we specialize in buying houses..."
                    />
                    <p className="text-sm text-red-500">
                      {errors.email_content?.message}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      You can use placeholders like [FIRST_NAME], [LAST_NAME],
                      [ADDRESS] for personalization
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Personalization */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  AI Features
                </h2>
                <div className="flex items-center space-x-3">
                  <input
                    {...register("use_ai_personalization")}
                    type="checkbox"
                    id="use_ai_personalization"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="use_ai_personalization"
                    className="text-sm font-medium text-gray-700"
                  >
                    Use AI Personalization
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enable AI-powered personalization to automatically customize
                  messages based on recipient data
                </p>
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateCampaignForm;
