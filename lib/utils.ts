// Utility functions for safe data handling

export const safeToFixed = (value: number | undefined | null, decimals: number = 2): string => {
  return (value || 0).toFixed(decimals);
};

export const safeCurrency = (value: number | undefined | null): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value || 0);
};

export const safeNumber = (value: number | undefined | null): number => {
  return value || 0;
};
