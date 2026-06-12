import { Tooltip } from 'antd';

const MyTooltip = ({ children, ...otherProps }) => {
  return <Tooltip {...otherProps}>{children}</Tooltip>;
};

export default MyTooltip;
