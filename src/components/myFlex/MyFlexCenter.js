import MyFlex from './MyFlex';

const MyFlexCenter = ({ children, ...otherProps }) => {
  return (
    <MyFlex
      {...otherProps}
      align="center"
      justify="center"
      // block
    >
      {children}
    </MyFlex>
  );
};

export default MyFlexCenter;
