import { Popover } from 'antd';

const MyPopover = ({
  children,
  arrow = false,
  trigger = 'click',
  ...otherProps
}) => {
  return (
    <Popover trigger={trigger} arrow={arrow} {...otherProps}>
      {children}
    </Popover>
  );
};

export default MyPopover;
