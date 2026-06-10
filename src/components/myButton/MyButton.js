import { Button } from 'antd';

const MyButton = ({ children, ...otherProps }) => {
  return <Button {...otherProps}>{children}</Button>;
};

export default MyButton;
