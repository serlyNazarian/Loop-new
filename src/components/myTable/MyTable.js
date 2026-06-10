import { Table } from 'antd';

const MyTable = ({ rowKey = 'id', size = 'middle', ...otherProps }) => {
  return <Table rowKey={rowKey} size={size} {...otherProps} />;
};

export default MyTable;
