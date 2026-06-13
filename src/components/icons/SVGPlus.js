import { memo } from 'react';
import MyIcon from '../myIcon/MyIcon';

const SVGIcon = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v16m8-8H4" />
  </svg>
);

const SVGPlus = ({ ...otherProps }) => (
  <MyIcon size={16} icon={<SVGIcon />} {...otherProps} />
);

export default memo(SVGPlus);
