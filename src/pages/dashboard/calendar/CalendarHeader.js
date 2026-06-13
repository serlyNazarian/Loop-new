import { useTranslation } from 'react-i18next';
import UtilDate from '../../../utils/UtilDate';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyButton from '../../../components/myButton/MyButton';
import ChevronDownIcon from '../../../components/icons/ChevronDownIcon';

const CalendarHeader = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <MyFlex align="center" justify="space-between" className="cal_header">
      <MyText fontSize={16} bold>
        {value.format('MMMM YYYY')}
      </MyText>
      <MyFlex align="center" gap={4}>
        <MyButton
          type="text"
          size="small"
          aria-label="Previous month"
          onClick={() => onChange(UtilDate.prevMonth(value))}
          icon={
            <ChevronDownIcon size={14} style={{ transform: 'rotate(90deg)' }} />
          }
        />
        <MyButton type="text" size="small" onClick={() => onChange(UtilDate.now())}>
          {t('cal_today')}
        </MyButton>
        <MyButton
          type="text"
          size="small"
          aria-label="Next month"
          onClick={() => onChange(UtilDate.nextMonth(value))}
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
