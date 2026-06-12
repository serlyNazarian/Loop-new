import { Select } from 'antd';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const MySelect = ({ size = 'large', suffixIcon, ...otherProps }) => {
  return (
    <Select
      size={size}
      suffixIcon={suffixIcon ?? <ChevronDownIcon size={12} />}
      {...otherProps}
    />
  );
};

export default MySelect;
