import MyCard from './MyCard';

const MyCardTransparent = ({ children, style, ...otherProps }) => {
  return (
    <MyCard
      block
      withoutShadow
      {...otherProps}
      style={{ backgroundColor: 'transparent', ...style }}
    >
      {children}
    </MyCard>
  );
};

export default MyCardTransparent;
