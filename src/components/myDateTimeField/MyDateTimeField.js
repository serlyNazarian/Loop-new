import UtilDate from '../../utils/UtilDate';
import MyInput from '../myInput/MyInput';
import useWindowSize from '../../hooks/useWindowSize';
import MyDatePicker from '../myDatePicker/MyDatePicker';
import './MyDateTimeField.css';

const NATIVE_FORMAT = 'YYYY-MM-DDTHH:mm';

const MyDateTimeField = ({ value, onChange, className, ...otherProps }) => {
  const { isMobile } = useWindowSize();

  if (isMobile) {
    return (
      <MyInput
        type="datetime-local"
        className={`my_datetime_native${className ? ` ${className}` : ''}`}
        value={value ? UtilDate.toDayjs(value).format(NATIVE_FORMAT) : ''}
        onChange={(e) =>
          onChange?.(e.target.value ? UtilDate.toDayjs(e.target.value) : null)
        }
        {...otherProps}
      />
    );
  }

  return (
    <MyDatePicker
      showTime
      value={value}
      onChange={onChange}
      className={className}
      format="MMM D, YYYY · h:mm A"
      {...otherProps}
    />
  );
};

export default MyDateTimeField;
