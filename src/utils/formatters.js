import dayjs from "dayjs";

/**
 * @param {string|Date} date
 * @param {string} format
 */
export const formatDateTime = (date, format = "DD MMM YYYY, hh:mm A") => {
  if (!date) return "N/A";
  return dayjs(date).format(format);
};

/**
 * @param {string} text
 * @param {number} length
 */
export const truncateText = (text, length = 40) => {
  if (!text) return "";
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * @param {string} str
 */
export const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * @param {number} amount
 * @param {string} currency
 */
export const formatCurrency = (amount, currency = "INR") => {
  if (amount == null) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
