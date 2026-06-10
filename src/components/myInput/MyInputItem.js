import MyInput from './MyInput';
import MyFormItem from '../myForm/MyFormItem';

const MyInputItem = ({
  name,
  label,
  rules,
  formItemProps,
  size = 'large',
  ...inputProps
}) => {
  return (
    <MyFormItem name={name} label={label} rules={rules} {...formItemProps}>
      <MyInput size={size} {...inputProps} />
    </MyFormItem>
  );
};

export default MyInputItem;
