import { Avatar } from 'antd';

const MyAvatar = ({ children, ...otherProps }) => {
  return <Avatar {...otherProps}>{children}</Avatar>;
};

export default MyAvatar;
