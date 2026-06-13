import { Select } from 'antd';
import SVGChevronDown from '../icons/SVGChevronDown';

const MySelect = ({ suffixIcon, ...otherProps }) => {
  return (
    <Select
      suffixIcon={suffixIcon ?? <SVGChevronDown size={12} />}
      {...otherProps}
    />
  );
};

export default MySelect;
