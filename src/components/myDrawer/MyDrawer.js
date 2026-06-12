import { Drawer } from 'antd';

const MyDrawer = ({ children, ...otherProps }) => {
  return <Drawer {...otherProps}>{children}</Drawer>;
};

export default MyDrawer;
