import { Popover } from 'antd';

const MyPopover = ({ trigger = 'click', children, ...otherProps }) => {
  return (
    <Popover trigger={trigger} {...otherProps}>
      {children}
    </Popover>
  );
};

export default MyPopover;
