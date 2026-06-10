import { Dropdown } from 'antd';

const MyDropdown = ({ trigger = ['click'], children, ...otherProps }) => {
  return (
    <Dropdown trigger={trigger} {...otherProps}>
      {children}
    </Dropdown>
  );
};

export default MyDropdown;
