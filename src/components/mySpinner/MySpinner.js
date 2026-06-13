import { Spin } from 'antd';
import MyFlexCenter from '../myFlex/MyFlexCenter';
import { LoadingOutlined } from '@ant-design/icons';

const MySpinner = ({ minHeight = '15vh' }) => {
  return (
    <MyFlexCenter style={{ minHeight: minHeight }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </MyFlexCenter>
  );
};

export default MySpinner;
