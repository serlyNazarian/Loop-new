import { theme } from 'antd';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyText from '../../../components/myText/MyText';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import ChevronDownIcon from '../../../components/icons/ChevronDownIcon';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const SidebarNotificationRow = ({
  ago,
  sub,
  title,
  variant,
  initial,
  onClick,
}) => {
  const { token } = theme.useToken();

  return (
    <MyFlex
      gap={12}
      align="center"
      onClick={onClick}
      className="sidebar_row"
      style={{ padding: '8px 12px', borderRadius: token.borderRadiusM }}
    >
      <MyFlexCenter
        style={{ borderRadius: token.borderRadiusM }}
        className={`square_36 flex_shrink_0 notif_avatar_${variant}`}
      >
        <MyText color={token.colorWhite} fontSize={14} bold>
          {initial}
        </MyText>
      </MyFlexCenter>
      <MyFlexVertical gap={2} className="flex_1 min_w_0">
        <MyFlex justify="space-between" align="center" gap={8}>
          <MyText fontSize={13} bold ellipsis>
            {title}
          </MyText>
          {ago && (
            <MyTextSecondary fontSize={11} className="flex_shrink_0">
              {ago}
            </MyTextSecondary>
          )}
        </MyFlex>
        <MyTextSecondary fontSize={11} ellipsis>
          {sub}
        </MyTextSecondary>
      </MyFlexVertical>
      <ChevronDownIcon
        size={14}
        className="flex_shrink_0"
        style={{
          transform: 'rotate(-90deg)',
          color: token.colorTextQuaternary,
        }}
      />
    </MyFlex>
  );
};

export default SidebarNotificationRow;
