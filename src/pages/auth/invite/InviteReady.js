import { theme } from 'antd';
import { useTranslation } from 'react-i18next';
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

const InviteReady = ({ invite, onAccept, onDecline }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const initial = invite.workspaceName.charAt(0).toUpperCase();

  const roleLabel =
    { admin: t('invite_role_admin'), agent: t('invite_role_agent') }[
      invite.role
    ] || t('invite_role_member');

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
          <MyText fontSize={26}>{t('invite_youve_been_invited')}</MyText>
          <MyTextSecondary fontSize={15} className="text_center">
            {t('invite_inviter_sentence', { inviterName: invite.inviterName })}
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
            <MyTextSecondary fontSize={11}>
              {t('invite_loop_workspace')}
            </MyTextSecondary>
          </MyFlexVertical>
          <MyText color={token.colorPrimary} fontSize={11} bold>
            {roleLabel}
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
            {t('invite_accept')}
          </MyButton>
          <MyButton block size="large" onClick={onDecline}>
            {t('invite_decline')}
          </MyButton>
        </MyFlexVertical>
        <MyFlexCenter gap={5}>
          <MyTextSecondary fontSize={12}>
            {t('invite_signed_in_as', { email: invite.email })}
          </MyTextSecondary>
          <MyLink to="/login" fontSize={12}>
            {t('invite_switch_account')}
          </MyLink>
        </MyFlexCenter>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default InviteReady;
