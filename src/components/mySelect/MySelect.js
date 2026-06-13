import { Select } from 'antd';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const MySelect = ({ suffixIcon, ...otherProps }) => {
  return (
    <Select
      suffixIcon={suffixIcon ?? <ChevronDownIcon size={12} />}
      {...otherProps}
    />
  );
};

export default MySelect;
