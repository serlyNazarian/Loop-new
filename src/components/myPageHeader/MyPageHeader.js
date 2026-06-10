import MyFlex from '../myFlex/MyFlex';
import MyTextTitle from '../myText/MyTextTitle';
import MyFlexVertical from '../myFlex/MyFlexVertical';
import MyTextSecondary from '../myText/MyTextSecondary';

const MyPageHeader = ({ title, subtitle, actions }) => {
  return (
    <MyFlex
      justify="space-between"
      align="flex-start"
      style={{ marginBottom: 24, width: '100%' }}
    >
      <MyFlexVertical gap={2}>
        <MyTextTitle fontSize={24}>{title}</MyTextTitle>
        {subtitle && (
          <MyTextSecondary fontSize={14}>{subtitle}</MyTextSecondary>
        )}
      </MyFlexVertical>
      {actions && <MyFlex gap={8}>{actions}</MyFlex>}
    </MyFlex>
  );
};

export default MyPageHeader;
