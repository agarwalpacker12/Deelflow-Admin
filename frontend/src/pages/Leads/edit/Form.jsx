import React, { useState } from "react";
import { leadsAPI } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";

import {
  setLeads,
  setLoading,
  setError,
} from "../../../store/slices/leadsSlice"; // Adjust path as needed

// Import utilities
import {
  DefaultValues,
  propertyTypeList,
  sourceList,
  contactMethodList,
  stateList,
  validateField,
} from "./utilities";

// Remove the mock API function and replace with real API call
const LeadForm = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const { leads, loading } = useSelector((state) => state.leads);

  const [formData, setFormData] = useState(DefaultValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    setSubmitStatus(null);
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    // Dispatch loading state
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      // Prepare data for API
      const apiData = {
        ...formData,
        estimated_value: formData.estimated_value
          ? parseFloat(formData.estimated_value)
          : null,
        mortgage_balance: formData.mortgage_balance
          ? parseFloat(formData.mortgage_balance)
          : null,
        asking_price: formData.asking_price
          ? parseFloat(formData.asking_price)
          : null,
      };
      const response = await leadsAPI.updateLead(apiData);

      if (response.data.status === "success") {
        const newLead = response.data.data;
        console.log("Lead updated successfully:", newLead);

        // Update Redux state with new lead
        // Option 1: Add the new lead to existing leads array
        dispatch(setLeads([...leads, newLead]));

        // Option 2: If you want to refetch all leads instead, you could call:
        // const allLeadsResponse = await leadsAPI.getAllLeads();
        // dispatch(setLeads(allLeadsResponse.data.data));

        setSubmitStatus("success");
        setSubmitMessage("Lead updated successfully! We'll contact you soon.");
        setFormData(DefaultValues);
        setErrors({});
      } else {
        throw new Error(response.data.message || "Failed to create lead");
      }
    } catch (error) {
      console.error("Error updating lead:", error);

      // Dispatch error to Redux
      dispatch(setError(error.response?.data?.message || error.message));

      // Handle validation errors from API
      if (error.response?.data?.errors) {
        const apiErrors = {};
        Object.keys(error.response.data.errors).forEach((key) => {
          apiErrors[key] = error.response.data.errors[key][0];
        });
        setErrors(apiErrors);
        setSubmitStatus("error");
        setSubmitMessage("Please fix the validation errors above.");
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          `Error creating lead: ${
            error.response?.data?.message ||
            error.message ||
            "Please try again."
          }`
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.first_name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.last_name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Property Information Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Property Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Address *
                  </label>
                  <input
                    name="property_address"
                    value={formData.property_address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.property_address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter property address"
                  />
                  {errors.property_address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.property_address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      name="property_city"
                      value={formData.property_city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                        errors.property_city
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.property_city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.property_city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <select
                      name="property_state"
                      value={formData.property_state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                        errors.property_state
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {stateList.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {errors.property_state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.property_state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      name="property_zip"
                      value={formData.property_zip}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                        errors.property_zip
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter ZIP code"
                    />
                    {errors.property_zip && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.property_zip}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.property_type
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {propertyTypeList.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.property_type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.property_type}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Information Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Financial Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Value
                  </label>
                  <input
                    name="estimated_value"
                    value={formData.estimated_value}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.estimated_value
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="$0"
                  />
                  {errors.estimated_value && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.estimated_value}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mortgage Balance
                  </label>
                  <input
                    name="mortgage_balance"
                    value={formData.mortgage_balance}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.mortgage_balance
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="$0"
                  />
                  {errors.mortgage_balance && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mortgage_balance}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asking Price
                  </label>
                  <input
                    name="asking_price"
                    value={formData.asking_price}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.asking_price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="$0"
                  />
                  {errors.asking_price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.asking_price}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Source *
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.source ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {sourceList.map((source) => (
                      <option key={source.value} value={source.value}>
                        {source.label}
                      </option>
                    ))}
                  </select>
                  {errors.source && (
                    <p className="text-red-500 text-sm mt-1">{errors.source}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Method *
                  </label>
                  <select
                    name="preferred_contact_method"
                    value={formData.preferred_contact_method}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black ${
                      errors.preferred_contact_method
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {contactMethodList.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                  {errors.preferred_contact_method && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preferred_contact_method}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Lead"}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-medium">✅ {submitMessage}</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-800 font-medium">❌ {submitMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
