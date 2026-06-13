import { Tag } from 'antd';

const MyTag = ({ children, ...otherProps }) => {
  return <Tag {...otherProps}>{children}</Tag>;
};

export default MyTag;
