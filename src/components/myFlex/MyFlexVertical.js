import MyFlex from './MyFlex';

const MyFlexVertical = ({ children, ...otherProps }) => {
  return (
    <MyFlex {...otherProps} vertical>
      {children}
    </MyFlex>
  );
};

export default MyFlexVertical;
