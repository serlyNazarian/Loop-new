import { Modal } from 'antd';

const MyModal = ({ children, ...otherProps }) => {
  return (
    <Modal centered {...otherProps}>
      {children}
    </Modal>
  );
};

export default MyModal;
