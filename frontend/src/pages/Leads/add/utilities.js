// Default form values
export const DefaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  property_address: "",
  property_city: "",
  property_state: "",
  property_zip: "",
  property_type: "",
  source: "",
  estimated_value: "",
  mortgage_balance: "",
  asking_price: "",
  preferred_contact_method: "",
};

// Property type options
export const propertyTypeList = [
  { value: "", label: "Select Property Type" },
  { value: "single_family", label: "Single Family" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "multi_family", label: "Multi Family" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

// Source options
export const sourceList = [
  { value: "", label: "Select Source" },
  { value: "website_form", label: "Website Form" },
  { value: "referral", label: "Referral" },
  { value: "cold_call", label: "Cold Call" },
  { value: "direct_mail", label: "Direct Mail" },
  { value: "social_media", label: "Social Media" },
  { value: "yard_sign", label: "Yard Sign" },
  { value: "other", label: "Other" },
];

// Contact method options
export const contactMethodList = [
  { value: "", label: "Select Contact Method" },
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "text", label: "Text/SMS" },
];

// US States list
export const stateList = [
  { value: "", label: "Select State" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

// Validation function
export const validateField = (name, value) => {
  switch (name) {
    case "first_name":
    case "last_name":
      if (!value) return `${name.replace("_", " ")} is required`;
      if (!/^[a-zA-Z\s]*$/.test(value)) return "Must be alphabetic value";
      if (value.length < 2)
        return `${name.replace("_", " ")} must be at least 2 characters`;
      return "";

    case "email":
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Must be a valid email";
      return "";

    case "phone":
      if (!value) return "Phone is required";
      if (!/^[\+]?[1-9][\d\s\-\(\)]{8,15}$/.test(value))
        return "Must be a valid phone number";
      return "";

    case "property_address":
      if (!value) return "Property address is required";
      if (value.length < 5)
        return "Property address must be at least 5 characters";
      return "";

    case "property_city":
      if (!value) return "Property city is required";
      if (!/^[a-zA-Z\s]*$/.test(value)) return "Must be alphabetic value";
      if (value.length < 2)
        return "Property city must be at least 2 characters";
      return "";

    case "property_state":
      if (!value) return "Property state is required";
      return "";

    case "property_zip":
      if (!value) return "Property zip is required";
      // if (!/^\d{5}(-\d{4})?$/.test(value)) return "Must be a valid zip code";
      return "";

    case "property_type":
      if (!value) return "Property type is required";
      return "";

    case "source":
      if (!value) return "Source is required";
      return "";

    case "estimated_value":
      if (value && value.trim()) {
        const num = parseFloat(value);
        if (isNaN(num) || num <= 0) return "Must be a positive number";
      }
      return "";

    case "mortgage_balance":
      if (value && value.trim()) {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) return "Must be a non-negative number";
      }
      return "";

    case "asking_price":
      if (value && value.trim()) {
        const num = parseFloat(value);
        if (isNaN(num) || num <= 0) return "Must be a positive number";
      }
      return "";

    case "preferred_contact_method":
      if (!value) return "Preferred contact method is required";
      return "";

    default:
      return "";
  }
}; 