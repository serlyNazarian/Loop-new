import { DatePicker } from 'antd';

const MyDatePicker = ({ size = 'large', ...otherProps }) => {
  return <DatePicker size={size} {...otherProps} />;
};

export default MyDatePicker;
