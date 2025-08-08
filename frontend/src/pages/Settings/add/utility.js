// utility.js for Tenant Form
import * as yup from "yup";

export const DefaultValues = {
  organization_name: "",
  organization_id: "",
  url_path: "",
  industry: "",
  organization_size: "",
  business_email: "",
  business_phone: "",
  support_email: "",
  street_address: "",
  city: "",
  state_province: "",
  zip_postal_code: "",
  country: "",
  timezone: "",
  language: "",
  // admin_first_name: "",
  // admin_last_name: "",
  // admin_email: "",
  // subscription_plan: "",
  // send_welcome_email: true,
};

export const settingsSchema = yup.object().shape({
  organization_name: yup.string().required("Organization name is required"),
  organization_id: yup.string().required("Organization ID is required"),
  url_path: yup.string().required("URL path is required"),
  industry: yup.string().required("Industry is required"),
  organization_size: yup.string().required("Organization size is required"),
  business_email: yup
    .string()
    .email("Please enter a valid email")
    .required("Business email is required"),
  business_phone: yup.string().required("Business phone is required"),
  support_email: yup
    .string()
    .email("Please enter a valid email")
    .required("Support email is required"),
  street_address: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  state_province: yup.string().required("State/Province is required"),
  zip_postal_code: yup.string().required("ZIP/Postal code is required"),
  country: yup.string().required("Country is required"),
  timezone: yup.string().required("Timezone is required"),
  language: yup.string().required("Language is required"),
  // admin_first_name: yup.string().required("First name is required"),
  // admin_last_name: yup.string().required("Last name is required"),
  // admin_email: yup
  //   .string()
  //   .email("Please enter a valid email")
  //   .required("Admin email is required"),
  // subscription_plan: yup.string().optional(),
  // send_welcome_email: yup.boolean().optional(),
});

// Industry options
export const industries = [
  { value: "real_estate", label: "Real Estate" },
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

// Organization sizes
export const organizationSizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

// Countries
export const countries = [
  { value: "united_states", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "united_kingdom", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "india", label: "India" },
  { value: "other", label: "Other" },
];

// Timezones
export const timezones = [
  { value: "america_chicago", label: "America/Chicago (CST/CDT)" },
  { value: "america_new_york", label: "America/New_York (EST/EDT)" },
  { value: "america_los_angeles", label: "America/Los_Angeles (PST/PDT)" },
  { value: "europe_london", label: "Europe/London (GMT/BST)" },
  { value: "asia_kolkata", label: "Asia/Kolkata (IST)" },
  { value: "australia_sydney", label: "Australia/Sydney (AEST/AEDT)" },
];

// Languages
export const languages = [
  { value: "english_us", label: "English (US)" },
  { value: "english_uk", label: "English (UK)" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
];

// Subscription plans
export const subscriptionPlans = [
  { value: "starter", label: "Starter - $299/month" },
  { value: "professional", label: "Professional - $499/month" },
  { value: "enterprise", label: "Enterprise - $999/month" },
  { value: "custom", label: "Custom Plan" },
];

// US States
export const usStates = [
  { value: "texas", label: "Texas" },
  { value: "california", label: "California" },
  { value: "new_york", label: "New York" },
  { value: "florida", label: "Florida" },
  { value: "illinois", label: "Illinois" },
  // Add more states as needed
];
