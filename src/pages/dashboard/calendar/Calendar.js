import { App } from 'antd';
import UtilCalendar from './UtilCalendar';
import CalendarHeader from './CalendarHeader';
import { statusOf } from './calendarConstants';
import { useTranslation } from 'react-i18next';
import UtilDate from '../../../utils/UtilDate';
import CalendarDayDrawer from './CalendarDayDrawer';
import MyTag from '../../../components/myTag/MyTag';
import CalendarCreateModal from './CalendarCreateModal';
import MyAlert from '../../../components/myAlert/MyAlert';
import SVGPlus from '../../../components/icons/SVGPlus';
import MyButton from '../../../components/myButton/MyButton';
import CalendarAppointmentModal from './CalendarAppointmentModal';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MyCalendar from '../../../components/myCalendar/MyCalendar';
import MyPageHeader from '../../../components/myPageHeader/MyPageHeader';
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
  const { t } = useTranslation();
  const { notification } = App.useApp();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createDate, setCreateDate] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [value, setValue] = useState(() => UtilDate.now());

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
        setError(e.message || t('cal_load_error'));
      } finally {
        if (showSpinner) setLoading(false);
      }
    },
    [year, monthIdx, t]
  );

  useEffect(() => {
    load(true);
  }, [load]);

  const apptsByDay = useMemo(
    () => UtilCalendar.bucketByDay(appointments),
    [appointments]
  );

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
      apptsByDay.get(
        UtilCalendar.dayKey(current.year(), current.month(), current.date())
      ) || [];
    if (!list.length) return null;
    return (
      <div className="cal_events">
        {list.slice(0, 2).map((a) => (
          <MyTag key={a.id} color={statusOf(a.status).color}>
            {UtilDate.formatTime(a.startsAt)} · {a.contactName}
          </MyTag>
        ))}
        {list.length > 2 && (
          <MyTextSecondary fontSize={10}>
            {t('cal_more', { count: list.length - 2 })}
          </MyTextSecondary>
        )}
      </div>
    );
  };

  const onSelect = (date, info) => {
    setValue(date);
    if (info?.source === 'date') {
      setSelectedDay(date);
      setDrawerOpen(true);
    }
  };

  const openCreate = (d) => {
    setCreateDate(d ? d.toDate() : null);
    setCreateOpen(true);
  };

  const selectedDayList = selectedDay
    ? apptsByDay.get(
        UtilCalendar.dayKey(
          selectedDay.year(),
          selectedDay.month(),
          selectedDay.date()
        )
      ) || []
    : [];

  const afterChange = () => {
    setSelectedAppt(null);
    load(false);
  };

  const warnIfNotNotified = (res, descKey) => {
    if (res && res.customerNotified === false) {
      notification.warning({
        title: t('cal_notify_failed_title'),
        description: t(descKey),
      });
    }
  };

  const subtitle = loading
    ? t('cal_loading')
    : monthCount === 0
      ? t('cal_subtitle_empty')
      : t('cal_subtitle_count', { count: monthCount });

  return (
    <>
      <MyPageHeader
        title={t('nav_calendar')}
        subtitle={subtitle}
        actions={
          <MyButton
            type="primary"
            icon={<SVGPlus />}
            onClick={() => openCreate(null)}
          >
            {t('cal_new_appointment')}
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
        open={drawerOpen}
        year={selectedDay?.year()}
        monthIdx={selectedDay?.month()}
        date={selectedDay?.date()}
        list={selectedDayList}
        onClose={() => setDrawerOpen(false)}
        afterOpenChange={(o) => {
          if (!o) setSelectedDay(null);
        }}
        onSelectAppointment={(a) => setSelectedAppt(a)}
        onCreate={() => {
          openCreate(selectedDay);
          setDrawerOpen(false);
        }}
      />
      <CalendarAppointmentModal
        appointment={selectedAppt}
        onClose={() => setSelectedAppt(null)}
        onApprove={async () => {
          const res = await approveAppointment(selectedAppt.id);
          afterChange();
          warnIfNotNotified(res, 'cal_notify_failed_approve');
        }}
        onDecline={async (reason) => {
          const res = await declineAppointment(selectedAppt.id, reason);
          afterChange();
          warnIfNotNotified(res, 'cal_notify_failed_decline');
        }}
        onCancel={async () => {
          await updateAppointment(selectedAppt.id, {
            status: 'cancelled',
            cancelReason: t('cal_cancelled_by_you'),
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
