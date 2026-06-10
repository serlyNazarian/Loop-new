import UtilString from '../../utils/UtilString';

const MyLinkA = ({
  bold,
  label,
  underline,
  blank = false,
  color = UtilString.EMPTY_STRING,
  className = UtilString.EMPTY_STRING,
  ...otherProps
}) => {
  return (
    <a
      className={`${color} ${className} ${
        underline ? 'text_underline' : ''
      } ${bold ? 'text_bold' : ''}`}
      target={blank ? '_blank' : undefined}
      rel={blank ? 'noopener noreferrer' : undefined}
      {...otherProps}
    >
      {label}
    </a>
  );
};

export default MyLinkA;
