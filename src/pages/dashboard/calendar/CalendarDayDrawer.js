import { theme } from 'antd';
import { statusOf } from './calendarConstants';
import { formatApptTime } from './calendarUtils';
import MyText from '../../../components/myText/MyText';
import MyFlex from '../../../components/myFlex/MyFlex';
import PlusIcon from '../../../components/icons/PlusIcon';
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
  monthIdx,
  date,
  list,
  onClose,
  onSelectAppointment,
  onCreate,
}) => {
  const { token } = theme.useToken();
  const items = list || [];

  const title = (
    <MyFlexVertical gap={0}>
      <MyText fontSize={16} bold>
        {date ? labelFor(year, monthIdx, date) : 'Day'}
      </MyText>
      <MyTextSecondary fontSize={12}>
        {items.length === 0
          ? 'No appointments'
          : `${items.length} appointment${items.length === 1 ? '' : 's'}`}
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
      extra={
        <MyButton
          type="text"
          aria-label="Close"
          onClick={onClose}
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
          New appointment on this day
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
              Nothing scheduled
            </MyText>
            <MyTextSecondary fontSize={13} className="text_center cal_empty_desc">
              Add your first appointment, or let your AI agent book one for you.
            </MyTextSecondary>
          </MyFlexVertical>
          <MyButton type="primary" icon={<PlusIcon />} onClick={onCreate}>
            New appointment
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
                    {formatApptTime(a.startsAt, a.timezone)}
                  </MyText>
                  <MyText
                    bold
                    fontSize={10}
                    className={`appt_tag appt_chip_${a.status}`}
                  >
                    {statusOf(a.status).label}
                  </MyText>
                </MyFlex>
                <MyText
                  fontSize={13}
                  className={cancelled ? 'appt_cancelled' : undefined}
                >
                  {a.contactName}
                </MyText>
                {a.serviceName && (
                  <MyTextSecondary fontSize={12}>
                    {a.serviceName} · {a.durationMin} min
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
