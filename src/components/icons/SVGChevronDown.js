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
    <path d="M19 9l-7 7-7-7" />
  </svg>
);

const SVGChevronDown = ({ ...otherProps }) => (
  <MyIcon size={14} icon={<SVGIcon />} {...otherProps} />
);

export default memo(SVGChevronDown);
