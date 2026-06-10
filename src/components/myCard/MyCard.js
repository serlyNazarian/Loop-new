import { Card } from 'antd';
import UtilString from '../../utils/UtilString';

const MyCard = ({
  block,
  style,
  children,
  withoutShadow,
  variant = 'borderless',
  className = UtilString.EMPTY_STRING,
  ...otherProps
}) => {
  return (
    <Card
      {...otherProps}
      variant={variant}
      className={`${className} ${block ? 'full_width' : ''}`}
      style={{ boxShadow: withoutShadow ? 'none' : undefined, ...style }}
    >
      {children}
    </Card>
  );
};

export default MyCard;
