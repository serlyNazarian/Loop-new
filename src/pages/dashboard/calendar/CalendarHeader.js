import dayjs from 'dayjs';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyButton from '../../../components/myButton/MyButton';
import ChevronDownIcon from '../../../components/icons/ChevronDownIcon';

const CalendarHeader = ({ value, onChange }) => {
  return (
    <MyFlex align="center" justify="space-between" className="cal_header">
      <MyText fontSize={16} bold>
        {value.format('MMMM YYYY')}
      </MyText>
      <MyFlex align="center" gap={4}>
        <MyButton
          type="text"
          aria-label="Previous month"
          onClick={() => onChange(value.subtract(1, 'month'))}
          icon={
            <ChevronDownIcon size={14} style={{ transform: 'rotate(90deg)' }} />
          }
        />
        <MyButton type="text" size="small" onClick={() => onChange(dayjs())}>
          Today
        </MyButton>
        <MyButton
          type="text"
          aria-label="Next month"
          onClick={() => onChange(value.add(1, 'month'))}
          icon={
            <ChevronDownIcon
              size={14}
              style={{ transform: 'rotate(-90deg)' }}
            />
          }
        />
      </MyFlex>
    </MyFlex>
  );
};

export default CalendarHeader;
