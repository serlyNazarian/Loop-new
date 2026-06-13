import { useState } from 'react';
import { statusOf } from './calendarConstants';
import { useTranslation } from 'react-i18next';
import UtilDate from '../../../utils/UtilDate';
import CalendarDetailRow from './CalendarDetailRow';
import MyTag from '../../../components/myTag/MyTag';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyModal from '../../../components/myModal/MyModal';
import CalendarDeclineModal from './CalendarDeclineModal';
import MyButton from '../../../components/myButton/MyButton';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyPopconfirm from '../../../components/myPopconfirm/MyPopconfirm';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import './calendar.css';

const CalendarAppointmentModal = ({
  onClose,
  onDelete,
  onCancel,
  onApprove,
  onDecline,
  appointment,
}) => {
  const { t } = useTranslation();

  const [declining, setDeclining] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);

  if (!appointment) return null;

  const a = appointment;
  const pending = a.status === 'pending';
  const dateLabel = UtilDate.formatDate(a.startsAt, 'ddd, MMM D');

  const handleDecline = async (reason) => {
    setDeclining(true);
    try {
      await onDecline(reason);
    } finally {
      setDeclining(false);
      setDeclineOpen(false);
    }
  };

  const footer = pending ? (
    <MyFlex gap={8} justify="flex-end">
      <MyButton danger onClick={() => setDeclineOpen(true)}>
        {t('cal_decline')}
      </MyButton>
      <MyButton type="primary" onClick={onApprove}>
        {t('cal_approve')}
      </MyButton>
    </MyFlex>
  ) : (
    <MyFlex gap={8} justify="flex-end">
      {a.status !== 'cancelled' && (
        <MyPopconfirm
          placement="topRight"
          onConfirm={onCancel}
          title={t('cal_cancel_confirm')}
          cancelText={t('cal_keep')}
          okText={t('cal_cancel_appointment')}
          okButtonProps={{ danger: true }}
        >
          <MyButton>{t('cal_cancel')}</MyButton>
        </MyPopconfirm>
      )}
      <MyPopconfirm
        placement="topRight"
        onConfirm={onDelete}
        title={t('cal_delete_confirm')}
        cancelText={t('cal_keep')}
        okText={t('cal_delete')}
        okButtonProps={{ danger: true }}
      >
        <MyButton danger>{t('cal_delete')}</MyButton>
      </MyPopconfirm>
    </MyFlex>
  );

  return (
    <>
      <MyModal
        open
        width={440}
        footer={footer}
        onCancel={onClose}
        title={a.contactName}
      >
        <MyFlexVertical gap={14}>
          <MyFlex align="center" gap={8} wrap="wrap">
            <MyTag color={statusOf(a.status).color}>
              {t(statusOf(a.status).labelKey)}
            </MyTag>
            <MyTextSecondary fontSize={11}>
              {t(a.createdBy === 'ai' ? 'cal_booked_ai' : 'cal_booked_manual')}
            </MyTextSecondary>
          </MyFlex>
          <MyTextSecondary fontSize={13}>
            {dateLabel} · {UtilDate.formatTime(a.startsAt)} ·{' '}
            {t('cal_minutes', { count: a.durationMin })}
          </MyTextSecondary>
          {a.serviceName && (
            <CalendarDetailRow label={t('cal_service')}>
              {a.serviceName}
            </CalendarDetailRow>
          )}
          {(a.contactPhone || a.contactEmail) && (
            <CalendarDetailRow label={t('cal_contact')}>
              {[a.contactPhone, a.contactEmail].filter(Boolean).join(' · ')}
            </CalendarDetailRow>
          )}
          {a.serviceNotes && (
            <CalendarDetailRow label={t('cal_notes')}>
              {a.serviceNotes}
            </CalendarDetailRow>
          )}
          {a.cancelReason && (
            <CalendarDetailRow label={t('cal_cancel_reason')}>
              {a.cancelReason}
            </CalendarDetailRow>
          )}
        </MyFlexVertical>
      </MyModal>
      {pending && (
        <CalendarDeclineModal
          open={declineOpen}
          saving={declining}
          onConfirm={handleDecline}
          onClose={() => setDeclineOpen(false)}
        />
      )}
    </>
  );
};

export default CalendarAppointmentModal;
