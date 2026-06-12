import { statusOf } from './calendarConstants';
import MyText from '../../../components/myText/MyText';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyModal from '../../../components/myModal/MyModal';
import MyButton from '../../../components/myButton/MyButton';
import { formatApptDate, formatApptTime } from './calendarUtils';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import './calendar.css';

const DetailRow = ({ label, children }) => (
  <MyFlexVertical gap={2}>
    <MyTextSecondary bold fontSize={10} className="appt_detail_label">
      {label}
    </MyTextSecondary>
    <MyText fontSize={13}>{children}</MyText>
  </MyFlexVertical>
);

const CalendarAppointmentModal = ({
  appointment,
  onClose,
  onApprove,
  onDecline,
  onCancel,
  onDelete,
}) => {
  if (!appointment) return null;

  const a = appointment;
  const s = statusOf(a.status);
  const pending = a.status === 'pending';
  const dateLabel = formatApptDate(a.startsAt, a.timezone, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const footer = pending ? (
    <MyFlex gap={8} justify="flex-end">
      <MyButton danger onClick={onDecline}>
        Decline
      </MyButton>
      <MyButton type="primary" onClick={onApprove}>
        Approve
      </MyButton>
    </MyFlex>
  ) : (
    <MyFlex gap={8} justify="flex-end">
      {a.status !== 'cancelled' && (
        <MyButton onClick={onCancel}>Cancel appointment</MyButton>
      )}
      <MyButton danger onClick={onDelete}>
        Delete
      </MyButton>
    </MyFlex>
  );

  return (
    <MyModal open width={440} footer={footer} onCancel={onClose} title={a.contactName}>
      <MyFlexVertical gap={14}>
        <MyFlex align="center" gap={8} wrap="wrap">
          <MyText bold fontSize={10} className={`appt_tag appt_chip_${a.status}`}>
            {s.label}
          </MyText>
          <MyTextSecondary fontSize={11}>
            booked {a.createdBy === 'ai' ? 'by AI' : 'manually'}
          </MyTextSecondary>
        </MyFlex>
        <MyTextSecondary fontSize={13}>
          {dateLabel} · {formatApptTime(a.startsAt, a.timezone)} · {a.durationMin} min
        </MyTextSecondary>
        {a.serviceName && <DetailRow label="Service">{a.serviceName}</DetailRow>}
        {(a.contactPhone || a.contactEmail) && (
          <DetailRow label="Contact">
            {[a.contactPhone, a.contactEmail].filter(Boolean).join(' · ')}
          </DetailRow>
        )}
        {a.serviceNotes && <DetailRow label="Notes">{a.serviceNotes}</DetailRow>}
        {a.cancelReason && (
          <DetailRow label="Cancel reason">{a.cancelReason}</DetailRow>
        )}
      </MyFlexVertical>
    </MyModal>
  );
};

export default CalendarAppointmentModal;
