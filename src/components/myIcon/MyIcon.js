import Icon from '@ant-design/icons';
import { cloneElement, memo } from 'react';
import useMyTheme from '../../hooks/useMyTheme';

const MyIcon = ({
  icon,
  style,
  color,
  rotate,
  onClick,
  size = 28,
  isMainButtonIcon,
  ...otherProps
}) => {
  const { token } = useMyTheme();

  return (
    <Icon
      style={style}
      component={() =>
        cloneElement(icon, {
          size: size,
          rotate: rotate,
          color: color || token.colorText,
          ...otherProps,
        })
      }
      onClick={onClick}
    />
  );
};

export default memo(MyIcon);
