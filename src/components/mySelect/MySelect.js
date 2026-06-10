import { Select } from 'antd';

const MySelect = ({ size = 'large', ...otherProps }) => {
  return <Select size={size} {...otherProps} />;
};

export default MySelect;
