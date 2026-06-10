import { Form } from 'antd';

const MyFormItem = ({ children, ...otherProps }) => {
  return <Form.Item {...otherProps}>{children}</Form.Item>;
};

export default MyFormItem;
