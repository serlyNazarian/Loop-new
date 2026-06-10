import { Input } from 'antd';

const MyOtp = ({ length = 6, size = 'large', ...otherProps }) => {
  return <Input.OTP length={length} size={size} {...otherProps} />;
};

export default MyOtp;
