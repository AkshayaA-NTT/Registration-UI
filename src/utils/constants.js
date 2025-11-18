// --------------------
// Deal-Related Constants
// --------------------

export const DEAL_TYPES = [
  { label: "New Business", value: "new" },
  { label: "Renewal", value: "renewal" },
  { label: "Upsell", value: "upsell" },
];

export const DEAL_STAGES = [
  { label: "Qualification", value: "qualification" },
  { label: "Proposal", value: "proposal" },
  { label: "Negotiation", value: "negotiation" },
  { label: "Closed Won", value: "closed_won" },
  { label: "Closed Lost", value: "closed_lost" },
];

export const SOLUTION_TYPES = [
  { label: "AI", value: "AI" },
  { label: "Cloud", value: "Cloud" },
  { label: "Data Analytics", value: "Data" },
  { label: "Cybersecurity", value: "Security" },
];

export const INDUSTRY_TYPES = [
  "Healthcare",
  "Finance",
  "Retail",
  "Education",
  "Manufacturing",
  "Technology",
];


export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const APP_NAME = "Deal Registration Platform";
