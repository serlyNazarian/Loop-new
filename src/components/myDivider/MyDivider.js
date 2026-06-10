import { Divider, theme } from 'antd';

const MyDivider = ({ children, style, ...otherProps }) => {
  const { token } = theme.useToken();
  return (
    <Divider
      plain
      {...otherProps}
      style={{ color: token.colorTextTertiary, ...style }}
    >
      {children}
    </Divider>
  );
};

export default MyDivider;
