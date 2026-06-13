import { theme } from 'antd';
import { statusOf } from './calendarConstants';
import { useTranslation } from 'react-i18next';
import UtilDate from '../../../utils/UtilDate';
import MyTag from '../../../components/myTag/MyTag';
import MyText from '../../../components/myText/MyText';
import MyFlex from '../../../components/myFlex/MyFlex';
import useWindowSize from '../../../hooks/useWindowSize';
import SVGPlus from '../../../components/icons/SVGPlus';
import MyButton from '../../../components/myButton/MyButton';
import MyDrawer from '../../../components/myDrawer/MyDrawer';
import { CalendarOutlined, CloseOutlined } from '@ant-design/icons';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import './calendar.css';

const labelFor = (year, monthIdx, date) =>
  new Date(year, monthIdx, date).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const CalendarDayDrawer = ({
  open,
  year,
  date,
  list,
  onClose,
  monthIdx,
  onCreate,
  afterOpenChange,
  onSelectAppointment,
}) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { isMobile } = useWindowSize();

  const items = list || [];

  const title = (
    <MyFlexVertical gap={0}>
      <MyText fontSize={16} bold>
        {date ? labelFor(year, monthIdx, date) : t('cal_day')}
      </MyText>
      <MyTextSecondary fontSize={12}>
        {items.length === 0
          ? t('cal_no_appointments')
          : t('cal_day_count', { count: items.length })}
      </MyTextSecondary>
    </MyFlexVertical>
  );

  return (
    <MyDrawer
      open={open}
      title={title}
      closable={false}
      placement="right"
      onClose={onClose}
      afterOpenChange={afterOpenChange}
      focusable={{ focusTriggerAfterClose: false }}
      styles={{ wrapper: { width: isMobile ? '100%' : 400 } }}
      extra={
        <MyButton
          type="text"
          size="small"
          onClick={onClose}
          aria-label={t('cal_close')}
          icon={<CloseOutlined />}
        />
      }
      footer={
        <MyButton
          block
          size="large"
          type="primary"
          onClick={onCreate}
          style={{
            border: 'none',
            background: token.brandGradient,
            boxShadow: token.brandButtonShadow,
          }}
        >
          {t('cal_new_appointment_day')}
        </MyButton>
      }
    >
      {items.length === 0 ? (
        <MyFlexVertical align="center" gap={14} className="cal_empty">
          <div className="cal_empty_icon">
            <CalendarOutlined />
          </div>
          <MyFlexVertical align="center" gap={4}>
            <MyText fontSize={16} bold>
              {t('cal_nothing_scheduled')}
            </MyText>
            <MyTextSecondary
              fontSize={13}
              className="text_center cal_empty_desc"
            >
              {t('cal_empty_desc')}
            </MyTextSecondary>
          </MyFlexVertical>
          <MyButton type="primary" icon={<SVGPlus />} onClick={onCreate}>
            {t('cal_new_appointment')}
          </MyButton>
        </MyFlexVertical>
      ) : (
        <MyFlexVertical gap={10}>
          {items.map((a) => {
            const cancelled = a.status === 'cancelled';
            return (
              <div
                key={a.id}
                className="appt_row"
                onClick={() => onSelectAppointment(a)}
              >
                <MyFlex align="center" justify="space-between" gap={8}>
                  <MyText
                    bold
                    fontSize={14}
                    className={cancelled ? 'appt_cancelled' : undefined}
                  >
                    {UtilDate.formatTime(a.startsAt)}
                  </MyText>
                  <MyTag color={statusOf(a.status).color}>
                    {t(statusOf(a.status).labelKey)}
                  </MyTag>
                </MyFlex>
                <MyText
                  fontSize={13}
                  className={cancelled ? 'appt_cancelled' : undefined}
                >
                  {a.contactName}
                </MyText>
                {a.serviceName && (
                  <MyTextSecondary fontSize={12}>
                    {a.serviceName} ·{' '}
                    {t('cal_minutes', { count: a.durationMin })}
                  </MyTextSecondary>
                )}
              </div>
            );
          })}
        </MyFlexVertical>
      )}
    </MyDrawer>
  );
};

export default CalendarDayDrawer;
