import { theme } from 'antd';
import MyText from './MyText';

const MyTextGradient = ({ children, fontSize = 34, style, ...otherProps }) => {
  const { token } = theme.useToken();

  const textStyle = {
    backgroundImage: token.authTitleGradient,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    ...style,
  };

  return (
    <MyText fontSize={fontSize} {...otherProps} style={textStyle}>
      {children}
    </MyText>
  );
};

export default MyTextGradient;
