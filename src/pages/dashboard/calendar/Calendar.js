import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PlusIcon from '../../../components/icons/PlusIcon';
import CalendarHeader from './CalendarHeader';
import CalendarDayDrawer from './CalendarDayDrawer';
import MyText from '../../../components/myText/MyText';
import CalendarCreateModal from './CalendarCreateModal';
import MyAlert from '../../../components/myAlert/MyAlert';
import MyButton from '../../../components/myButton/MyButton';
import MyCalendar from '../../../components/myCalendar/MyCalendar';
import CalendarAppointmentModal from './CalendarAppointmentModal';
import MyPageHeader from '../../../components/myPageHeader/MyPageHeader';
import { bucketByDay, dayKey, formatApptTime } from './calendarUtils';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import {
  getAppointments,
  updateAppointment,
  deleteAppointment,
  approveAppointment,
  declineAppointment,
} from '../../../actions/calendarActions';
import './calendar.css';

const Calendar = () => {
  const [value, setValue] = useState(() => dayjs());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createDate, setCreateDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const year = value.year();
  const monthIdx = value.month();

  const load = useCallback(
    async (showSpinner) => {
      if (showSpinner) setLoading(true);
      setError(null);
      try {
        const from = new Date(year, monthIdx - 1, 20).toISOString();
        const to = new Date(year, monthIdx + 1, 10).toISOString();
        const data = await getAppointments({ from, to });
        setAppointments(data?.appointments || []);
      } catch (e) {
        setError(e.message || 'Could not load your calendar.');
      } finally {
        if (showSpinner) setLoading(false);
      }
    },
    [year, monthIdx]
  );

  useEffect(() => {
    load(true);
  }, [load]);

  const apptsByDay = useMemo(() => bucketByDay(appointments), [appointments]);

  const monthCount = useMemo(
    () =>
      appointments.filter((a) => {
        const d = new Date(a.startsAt);
        return d.getFullYear() === year && d.getMonth() === monthIdx;
      }).length,
    [appointments, year, monthIdx]
  );

  const cellRender = (current, info) => {
    if (info.type !== 'date') return info.originNode;
    const list =
      apptsByDay.get(dayKey(current.year(), current.month(), current.date())) ||
      [];
    if (!list.length) return null;
    return (
      <div className="cal_events">
        {list.slice(0, 2).map((a) => (
          <MyText
            key={a.id}
            fontSize={10}
            className={`appt_chip appt_chip_${a.status}${
              a.status === 'cancelled' ? ' appt_cancelled' : ''
            }`}
          >
            {formatApptTime(a.startsAt, a.timezone)} · {a.contactName}
          </MyText>
        ))}
        {list.length > 2 && (
          <MyTextSecondary fontSize={10}>
            +{list.length - 2} more
          </MyTextSecondary>
        )}
      </div>
    );
  };

  const onSelect = (date, info) => {
    setValue(date);
    if (info?.source === 'date') setSelectedDay(date);
  };

  const openCreate = (d) => {
    setCreateDate(d ? d.toDate() : null);
    setCreateOpen(true);
  };

  const selectedDayList = selectedDay
    ? apptsByDay.get(
        dayKey(selectedDay.year(), selectedDay.month(), selectedDay.date())
      ) || []
    : [];

  const afterChange = () => {
    setSelectedAppt(null);
    load(false);
  };

  const subtitle = loading
    ? 'Loading…'
    : monthCount === 0
      ? 'No appointments this month yet.'
      : `${monthCount} appointment${monthCount === 1 ? '' : 's'} this month.`;

  return (
    <>
      <MyPageHeader
        title="Calendar"
        subtitle={subtitle}
        actions={
          <MyButton
            type="primary"
            icon={<PlusIcon />}
            onClick={() => openCreate(null)}
          >
            New appointment
          </MyButton>
        }
      />
      {error && <MyAlert type="error" message={error} />}
      <div className="cal_panel">
        <MyCalendar
          value={value}
          onSelect={onSelect}
          cellRender={cellRender}
          onPanelChange={(v) => setValue(v)}
          headerRender={({ value: hv }) => (
            <CalendarHeader value={hv} onChange={setValue} />
          )}
        />
      </div>
      <CalendarCreateModal
        open={createOpen}
        defaultDate={createDate}
        onClose={() => setCreateOpen(false)}
        onCreated={() => {
          setCreateOpen(false);
          load(false);
        }}
      />
      <CalendarDayDrawer
        open={!!selectedDay}
        year={selectedDay?.year()}
        monthIdx={selectedDay?.month()}
        date={selectedDay?.date()}
        list={selectedDayList}
        onClose={() => setSelectedDay(null)}
        onSelectAppointment={(a) => setSelectedAppt(a)}
        onCreate={() => {
          openCreate(selectedDay);
          setSelectedDay(null);
        }}
      />
      <CalendarAppointmentModal
        appointment={selectedAppt}
        onClose={() => setSelectedAppt(null)}
        onApprove={async () => {
          await approveAppointment(selectedAppt.id);
          afterChange();
        }}
        onDecline={async () => {
          await declineAppointment(selectedAppt.id);
          afterChange();
        }}
        onCancel={async () => {
          await updateAppointment(selectedAppt.id, {
            status: 'cancelled',
            cancelReason: 'Cancelled by you',
          });
          afterChange();
        }}
        onDelete={async () => {
          await deleteAppointment(selectedAppt.id);
          afterChange();
        }}
      />
    </>
  );
};

export default Calendar;
