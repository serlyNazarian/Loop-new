import { Link } from 'react-router-dom';
import { theme } from 'antd';

const MyLink = ({
  to,
  path,
  state,
  search,
  style,
  children,
  _blank = false,
  underline = false,
  ...otherProps
}) => {
  const { token } = theme.useToken();

  const target = to ?? path ?? '';

  const location =
    typeof target === 'string'
      ? { pathname: target, search, state }
      : { search, state, ...target };

  return (
    <Link
      {...otherProps}
      to={location}
      state={state}
      target={_blank ? '_blank' : undefined}
      rel={_blank ? 'noopener noreferrer' : undefined}
      style={{
        color: token.colorPrimary,
        textDecoration: underline ? 'underline' : 'none',
        ...style,
      }}
    >
      {children}
    </Link>
  );
};

export default MyLink;
