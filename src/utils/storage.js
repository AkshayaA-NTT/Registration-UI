/**
 * @param {string} key 
 * @param {*} value 
 */
export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("❌ Error saving to localStorage:", err);
  }
};

/**
 * @param {string} key
 */
export const getStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error("❌ Error reading localStorage:", err);
    return null;
  }
};

/**
 * @param {string} key
 */
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("❌ Error removing localStorage item:", err);
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("❌ Error clearing localStorage:", err);
  }
};
