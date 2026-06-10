import { Form } from 'antd';

const MyForm = ({ children, ...otherProps }) => {
  return <Form {...otherProps}>{children}</Form>;
};

MyForm.useForm = Form.useForm;
MyForm.useWatch = Form.useWatch;
MyForm.Provider = Form.Provider;

export default MyForm;
