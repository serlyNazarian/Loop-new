import { Input } from 'antd';

const MyInput = ({ children, ...otherProps }) => {
  return <Input {...otherProps}>{children}</Input>;
};

MyInput.Password = Input.Password;
MyInput.TextArea = Input.TextArea;
MyInput.Search = Input.Search;

export default MyInput;
