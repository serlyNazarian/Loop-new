import { Badge } from 'antd';

const MyBadge = ({ children, ...otherProps }) => {
  return <Badge {...otherProps}>{children}</Badge>;
};

export default MyBadge;
