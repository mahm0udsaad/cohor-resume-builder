export const calculateDiscountedPrice = (originalPrice, discountPercent) => {
  if (!discountPercent || discountPercent === 0) return originalPrice;
  return originalPrice * (1 - discountPercent / 100);
};
