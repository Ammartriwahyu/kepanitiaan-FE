export const getExpiryStatus = (expiredAt) => {
  const now = new Date();
  const days = Math.ceil((new Date(expiredAt) - now) / (1000 * 60 * 60 * 24));
  if (days <= 0) return { label: "Expired", days: 0 };
  if (days <= 7) return { label: `${days} hari lagi`, days };
  return { label: `${days} hari lagi`, days };
};