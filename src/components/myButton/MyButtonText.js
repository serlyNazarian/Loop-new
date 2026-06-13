import MyButton from './MyButton';

const MyButtonText = ({ ...otherProps }) => {
  return <MyButton {...otherProps} type="text" />;
};

export default MyButtonText;
