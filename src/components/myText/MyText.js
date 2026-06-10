import { Typography } from 'antd';

const { Text } = Typography;

const MyText = ({
  color,
  style,
  children,
  lineHeight,
  fontWeight,
  bold = false,
  fontSize = 14,
  ...otherProps
}) => {
  return (
    <Text
      {...otherProps}
      style={{
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        ...style,
      }}
      strong={bold}
    >
      {children}
    </Text>
  );
};

export default MyText;
