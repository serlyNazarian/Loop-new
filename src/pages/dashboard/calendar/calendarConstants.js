export const STATUS_META = {
  pending: { labelKey: 'cal_status_pending', color: 'gold' },
  confirmed: { labelKey: 'cal_status_confirmed', color: 'purple' },
  completed: { labelKey: 'cal_status_completed', color: 'green' },
  cancelled: { labelKey: 'cal_status_cancelled', color: 'default' },
  no_show: { labelKey: 'cal_status_no_show', color: 'volcano' },
};

export const statusOf = (status) => STATUS_META[status] || STATUS_META.confirmed;

export const DURATION_VALUES = [15, 30, 45, 60, 90, 120];
