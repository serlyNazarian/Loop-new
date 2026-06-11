import { Result } from 'antd';
import MyFlexCenter from '../myFlex/MyFlexCenter';

const MyResult = ({ ...otherProps }) => {
  return (
    <MyFlexCenter style={{ height: '100dvh' }}>
      <Result {...otherProps} />
    </MyFlexCenter>
  );
};

export default MyResult;
