import { Popconfirm } from 'antd';

const MyPopconfirm = ({ children, ...otherProps }) => {
  return <Popconfirm {...otherProps}>{children}</Popconfirm>;
};

export default MyPopconfirm;
