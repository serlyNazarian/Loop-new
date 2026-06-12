import { theme } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import MyText from '../../../components/myText/MyText';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyLink from '../../../components/myLink/MyLink';
import MyButton from '../../../components/myButton/MyButton';
import MyAvatar from '../../../components/myAvatar/MyAvatar';
import MyFlexCenter from '../../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';

const ROLE_LABEL = { admin: 'Admin', agent: 'Agent' };

const InviteReady = ({ invite, onAccept, onDecline }) => {
  const { token } = theme.useToken();
  const initial = invite.workspaceName.charAt(0).toUpperCase();

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={20}>
        <MyFlexVertical gap={8} align="center">
          <MyAvatar
            shape="square"
            size={56}
            style={{
              fontSize: token.fontSizeXL,
              backgroundColor: token.colorPrimary,
            }}
          >
            {initial}
          </MyAvatar>
          <MyText fontSize={26}>You've been invited</MyText>
          <MyTextSecondary fontSize={15} className="text_center">
            {invite.inviterName} invited you to join their workspace.
          </MyTextSecondary>
        </MyFlexVertical>

        <MyFlex
          align="center"
          gap={12}
          style={{
            padding: 14,
            borderRadius: token.borderRadiusLG,
            border: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <MyAvatar
            shape="square"
            style={{ backgroundColor: token.colorPrimary, flexShrink: 0 }}
          >
            {initial}
          </MyAvatar>
          <MyFlexVertical gap={0} className="flex_1 min_w_0">
            <MyText fontSize={14} bold ellipsis>
              {invite.workspaceName}
            </MyText>
            <MyTextSecondary fontSize={11}>Loop workspace</MyTextSecondary>
          </MyFlexVertical>
          <MyText color={token.colorPrimary} fontSize={11} bold>
            {ROLE_LABEL[invite.role] || 'Member'}
          </MyText>
        </MyFlex>

        <MyFlexVertical gap={10}>
          <MyButton
            block
            size="large"
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            onClick={onAccept}
          >
            Accept invite
          </MyButton>
          <MyButton block size="large" onClick={onDecline}>
            Decline
          </MyButton>
        </MyFlexVertical>

        <MyFlexCenter gap={5}>
          <MyTextSecondary fontSize={12}>
            Signed in as {invite.email}.
          </MyTextSecondary>
          <MyLink to="/login" fontSize={12}>
            Switch account
          </MyLink>
        </MyFlexCenter>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default InviteReady;
