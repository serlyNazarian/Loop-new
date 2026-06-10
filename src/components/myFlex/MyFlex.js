import { Flex } from 'antd';

const MyFlex = ({ children, gap = 10, ...otherProps }) => {
  return (
    <Flex {...otherProps} gap={gap}>
      {children}
    </Flex>
  );
};

export default MyFlex;
