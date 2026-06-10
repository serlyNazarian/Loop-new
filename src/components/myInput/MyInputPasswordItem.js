import MyInput from './MyInput';
import MyFormItem from '../myForm/MyFormItem';

const MyInputPasswordItem = ({
  name,
  label,
  rules,
  formItemProps,
  size = 'large',
  ...inputProps
}) => {
  return (
    <MyFormItem name={name} label={label} rules={rules} {...formItemProps}>
      <MyInput.Password size={size} {...inputProps} />
    </MyFormItem>
  );
};

export default MyInputPasswordItem;
