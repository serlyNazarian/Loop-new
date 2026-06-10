import MyText from './MyText';

const MyTextSecondary = ({ children, ...otherProps }) => {
  return (
    <MyText type="secondary" {...otherProps}>
      {children}
    </MyText>
  );
};

export default MyTextSecondary;
