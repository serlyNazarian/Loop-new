import { useTranslation } from 'react-i18next';
import UtilDate from '../../../utils/UtilDate';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyButton from '../../../components/myButton/MyButton';
import SVGChevronDown from '../../../components/icons/SVGChevronDown';

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
          aria-label={t('cal_prev_month')}
          onClick={() => onChange(UtilDate.prevMonth(value))}
          icon={
            <SVGChevronDown size={14} style={{ transform: 'rotate(90deg)' }} />
          }
        />
        <MyButton type="text" size="small" onClick={() => onChange(UtilDate.now())}>
          {t('cal_today')}
        </MyButton>
        <MyButton
          type="text"
          size="small"
          aria-label={t('cal_next_month')}
          onClick={() => onChange(UtilDate.nextMonth(value))}
          icon={
            <SVGChevronDown
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
