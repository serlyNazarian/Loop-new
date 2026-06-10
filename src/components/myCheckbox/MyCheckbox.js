import { Checkbox } from 'antd';

const MyCheckbox = ({ children, ...otherProps }) => {
  return <Checkbox {...otherProps}>{children}</Checkbox>;
};

export default MyCheckbox;
