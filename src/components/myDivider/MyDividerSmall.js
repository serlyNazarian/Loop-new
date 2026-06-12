import MyDivider from './MyDivider';

const MyDividerSmall = ({ children, ...otherProps }) => {
  return (
    <MyDivider {...otherProps} style={{ margin: '4px 0' }}>
      {children}
    </MyDivider>
  );
};

export default MyDividerSmall;
