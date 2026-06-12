const HomeSkeletonBar = ({ width, token, opacity = 1 }) => {
  return (
    <div
      style={{
        width,
        opacity,
        height: 10,
        borderRadius: 6,
        background: token.colorFillSecondary,
      }}
    />
  );
};

export default HomeSkeletonBar;
