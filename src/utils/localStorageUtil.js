// Save data to localStorage
const setItem = (key, value) => localStorage.setItem(key, value);

// Get data from localStorage
const getItem = (key) => localStorage.getItem(key);

// Remove item from localStorage
const removeItem = (key) => localStorage.removeItem(key);

// Clear all localStorage data
const clear = () => localStorage.clear();

export { setItem, removeItem, getItem, clear };
