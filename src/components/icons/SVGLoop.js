import { memo } from 'react';
import MyIcon from '../myIcon/MyIcon';

const SVGIcon = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 548.92 548.73"
    fill="none"
    stroke="currentColor"
    strokeWidth={28}
    strokeMiterlimit={10}
  >
    <path d="M196.8,499.92h131.99c88.05,0,159.42-71.38,159.42-159.42v-131.99c0-29.93-8.35-57.86-22.73-81.76-4.84-8.04-3.27-18.34,3.93-24.37l36.59-30.66c9.17-7.69,3.74-22.63-8.23-22.63h-168.98s-52.28,0-52.28,0h-79.71c-88.05,0-159.42,71.38-159.42,159.42v131.99c0,88.05,71.38,159.42,159.42,159.42Z" />
    <rect
      fill="currentColor"
      stroke="none"
      x="139.89"
      y="221.49"
      width="159.28"
      height="84.54"
      rx="34.2"
      ry="34.2"
      transform="translate(483.29 44.23) rotate(90)"
    />
    <rect
      fill="currentColor"
      stroke="none"
      x="302.66"
      y="221.49"
      width="159.28"
      height="84.54"
      rx="34.2"
      ry="34.2"
      transform="translate(646.07 -118.54) rotate(90)"
    />
  </svg>
);

const SVGLoop = ({ ...otherProps }) => (
  <MyIcon size={18} icon={<SVGIcon />} {...otherProps} />
);

export default memo(SVGLoop);
