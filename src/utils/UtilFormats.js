const toNumber = (value) => {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
};

const groupedFormatter = new Intl.NumberFormat('en-US');

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const UtilFormats = {
  number: (value) => groupedFormatter.format(toNumber(value)),
  compact: (value) => compactFormatter.format(toNumber(value)),
};

export default UtilFormats;
