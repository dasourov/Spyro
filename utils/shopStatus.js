// utils/shopStatus.js
export const isShopOpen = () => {
  if (typeof window !== 'undefined') {
    const status = localStorage.getItem('shopOpenStatus');
    return status !== 'false'; // Default to true if not set
  }
  return true; // Default to true during server-side rendering
};