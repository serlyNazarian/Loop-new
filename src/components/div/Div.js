import { forwardRef } from 'react';
import UtilString from '../../utils/UtilString';

const Div = forwardRef(
  ({ onClick, className = UtilString.EMPTY_STRING, ...otherProps }, ref) => {
    return (
      <div
        {...otherProps}
        ref={ref}
        onClick={onClick}
        className={`${className} ${onClick ? 'pointer' : ''}`}
      />
    );
  }
);

export default Div;
