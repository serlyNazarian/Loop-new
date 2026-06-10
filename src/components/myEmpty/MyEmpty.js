import { Empty } from 'antd';
import MyButton from '../myButton/MyButton';
import MyFlexVertical from '../myFlex/MyFlexVertical';

const MyEmpty = ({
  onAction,
  actionLabel,
  description = 'Nothing here yet',
  ...otherProps
}) => {
  return (
    <MyFlexVertical align="center" gap={16} style={{ padding: '48px 0' }}>
      <Empty description={description} {...otherProps} />
      {actionLabel && (
        <MyButton type="primary" onClick={onAction}>
          {actionLabel}
        </MyButton>
      )}
    </MyFlexVertical>
  );
};

export default MyEmpty;
