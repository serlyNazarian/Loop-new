import { Image } from 'antd';

const MyImage = ({ width, height, size, style, ...otherProps }) => {
  return (
    <div className="full_width flex_center" style={{ ...style }}>
      <Image
        {...otherProps}
        preview={false}
        width={size ?? width}
        height={size ?? height}
      />
    </div>
  );
};

export default MyImage;
