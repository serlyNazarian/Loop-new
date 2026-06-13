import UtilDate from '../../../utils/UtilDate';

const dayKey = (year, monthIdx, date) => `${year}-${monthIdx}-${date}`;

const UtilCalendar = {
  dayKey,

  bucketByDay: (appointments) => {
    const map = new Map();
    for (const a of appointments) {
      const d = UtilDate.toDayjs(a.startsAt);
      const key = dayKey(d.year(), d.month(), d.date());
      const list = map.get(key) || [];
      list.push(a);
      map.set(key, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => {
        if (a.status === 'cancelled' && b.status !== 'cancelled') return 1;
        if (b.status === 'cancelled' && a.status !== 'cancelled') return -1;
        return (
          UtilDate.toDayjs(a.startsAt).valueOf() -
          UtilDate.toDayjs(b.startsAt).valueOf()
        );
      });
    }
    return map;
  },
};

export default UtilCalendar;
