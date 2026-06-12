export const dayKey = (year, monthIdx, date) => `${year}-${monthIdx}-${date}`;

export const ymdInZone = (iso, tz) => {
  const date = new Date(iso);
  if (!tz)
    return {
      y: date.getFullYear(),
      m: date.getMonth(),
      d: date.getDate(),
    };
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = (t) =>
    parseInt(parts.find((p) => p.type === t)?.value || '0', 10);
  return { y: get('year'), m: get('month') - 1, d: get('day') };
};

export const formatApptTime = (iso, tz) =>
  new Date(iso).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    ...(tz ? { timeZone: tz } : {}),
  });

export const formatApptDate = (iso, tz, opts = {}) =>
  new Date(iso).toLocaleDateString(undefined, {
    ...opts,
    ...(tz ? { timeZone: tz } : {}),
  });

export const bucketByDay = (appointments) => {
  const map = new Map();
  for (const a of appointments) {
    const { y, m, d } = ymdInZone(a.startsAt, a.timezone);
    const key = dayKey(y, m, d);
    const list = map.get(key) || [];
    list.push(a);
    map.set(key, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => {
      if (a.status === 'cancelled' && b.status !== 'cancelled') return 1;
      if (b.status === 'cancelled' && a.status !== 'cancelled') return -1;
      return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
    });
  }
  return map;
};
