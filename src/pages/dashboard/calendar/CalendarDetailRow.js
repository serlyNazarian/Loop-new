import MyText from '../../../components/myText/MyText';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import './calendar.css';

const CalendarDetailRow = ({ label, children }) => (
  <MyFlexVertical gap={2}>
    <MyTextSecondary bold fontSize={10} className="appt_detail_label">
      {label}
    </MyTextSecondary>
    <MyText fontSize={13}>{children}</MyText>
  </MyFlexVertical>
);

export default CalendarDetailRow;
