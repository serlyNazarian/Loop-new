import { Modal } from 'antd';

const MyModal = ({ children, ...otherProps }) => {
  return <Modal {...otherProps}>{children}</Modal>;
};

export default MyModal;
