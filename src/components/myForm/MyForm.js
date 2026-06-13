import { Form } from 'antd';
import MyFlexVertical from '../myFlex/MyFlexVertical';

const requiredMarkAtEnd = (label, { required }) => (
  <>
    {label}
    {required && <span className="form_required_mark">*</span>}
  </>
);

const MyForm = ({
  gap,
  children,
  layout = 'vertical',
  validateTrigger = ['onSubmit'],
  requiredMark = requiredMarkAtEnd,
  ...otherProps
}) => {
  return (
    <Form
      layout={layout}
      scrollToFirstError
      requiredMark={requiredMark}
      validateTrigger={validateTrigger}
      {...otherProps}
    >
      <MyFlexVertical gap={gap}>{children}</MyFlexVertical>
    </Form>
  );
};

MyForm.useForm = Form.useForm;
MyForm.useWatch = Form.useWatch;
MyForm.Provider = Form.Provider;

export default MyForm;
