/**
 * Formats a number as USD currency.
 * @param value - The numerical value to format.
 * @returns A string formatted as currency (e.g., "$1,234.56").
 */

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

/**
 * Formats a number with a specific number of decimal places.
 * @param value - The numerical value to format.
 * @param decimals - The maximum number of fractional digits (default is 1).
 * @returns A string representation of the formatted number.
 */

export const formatNumber = (value: number, decimals: number = 1) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: decimals }).format(value);
};
