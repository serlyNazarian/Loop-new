export const STATUS_META = {
  pending: { label: 'Pending' },
  confirmed: { label: 'Confirmed' },
  completed: { label: 'Completed' },
  cancelled: { label: 'Cancelled' },
  no_show: { label: 'No-show' },
};

export const statusOf = (status) => STATUS_META[status] || STATUS_META.confirmed;

export const DURATION_OPTIONS = [15, 30, 45, 60, 90, 120].map((v) => ({
  value: v,
  label: `${v} min`,
}));
