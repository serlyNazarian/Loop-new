import { useEffect, useState } from 'react';
import { theme } from 'antd';
import { getMe } from '../../actions/authActions';
import MyText from '../../components/myText/MyText';
import MyFlex from '../../components/myFlex/MyFlex';
import MyLink from '../../components/myLink/MyLink';
import MyButton from '../../components/myButton/MyButton';
import MyAvatar from '../../components/myAvatar/MyAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import MyLoader from '../../components/myLoader/MyLoader';
import MyFlexCenter from '../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../components/myText/MyTextSecondary';
import MyCardTransparent from '../../components/myCard/MyCardTransparent';
import {
  getInvitePreview,
  acceptInvite as acceptInviteAction,
} from '../../actions/workspaceActions';
import {
  CheckOutlined,
  CloseOutlined,
  WarningOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const ROLE_LABEL = { admin: 'Admin', agent: 'Agent' };

const Invite = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { token: inviteToken } = useParams();

  const [state, setState] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [invite, setInvite] = useState(null);
  const [joinedWorkspace, setJoinedWorkspace] = useState('');

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        await getMe();
      } catch {
        navigate(`/login?next=/invite/${inviteToken}`, { replace: true });
        return;
      }
      try {
        const preview = await getInvitePreview(inviteToken);
        if (cancelled) return;
        setInvite(preview);
        setState('ready');
      } catch (err) {
        if (cancelled) return;
        setState('error');
        setErrorMsg(err.message || 'This invite is invalid or has expired.');
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, [inviteToken, navigate]);

  const acceptInvite = async () => {
    setState('accepting');
    try {
      const data = await acceptInviteAction(inviteToken);
      setJoinedWorkspace(
        data.workspaceName || invite?.workspaceName || 'the workspace'
      );
      setState('done');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      if (err.status === 403) {
        setState('wrong-account');
        setErrorMsg(
          err.message || 'This invite was sent to a different account.'
        );
      } else {
        setState('error');
        setErrorMsg(err.message || 'Failed to accept invite.');
      }
    }
  };

  const declineInvite = () => setState('declined');

  const statusIcon = (icon, color) => (
    <MyFlexCenter
      style={{ width: 56, height: 56, borderRadius: '50%', background: color }}
    >
      {icon}
    </MyFlexCenter>
  );

  let body;
  if (state === 'loading') {
    body = <MyLoader message="Loading invite…" />;
  } else if (state === 'accepting') {
    body = (
      <MyLoader
        message={`Joining ${invite?.workspaceName || 'the workspace'}…`}
      />
    );
  } else if (state === 'ready' && invite) {
    body = (
      <MyFlexVertical gap={20}>
        <MyFlexVertical gap={8} align="center">
          <MyAvatar
            shape="square"
            size={56}
            style={{ backgroundColor: token.colorPrimary, fontSize: 22 }}
          >
            {invite.workspaceName.charAt(0).toUpperCase()}
          </MyAvatar>
          <MyText fontSize={26}>You've been invited</MyText>
          <MyTextSecondary fontSize={15} style={{ textAlign: 'center' }}>
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
            {invite.workspaceName.charAt(0).toUpperCase()}
          </MyAvatar>
          <MyFlexVertical gap={0} style={{ flex: 1, minWidth: 0 }}>
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
            type="primary"
            block
            size="large"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            onClick={acceptInvite}
          >
            Accept invite
          </MyButton>
          <MyButton block size="large" onClick={declineInvite}>
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
    );
  } else if (state === 'declined') {
    body = (
      <MyFlexVertical gap={16} align="center">
        {statusIcon(
          <CloseOutlined
            style={{ color: token.colorTextSecondary, fontSize: 22 }}
          />,
          token.colorFillSecondary
        )}
        <MyText fontSize={22}>Invite declined</MyText>
        <MyTextSecondary fontSize={15} style={{ textAlign: 'center' }}>
          You declined the invite to {invite?.workspaceName}.
        </MyTextSecondary>
        <MyButton block size="large" onClick={() => navigate('/login')}>
          Back to sign in
        </MyButton>
      </MyFlexVertical>
    );
  } else if (state === 'done') {
    body = (
      <MyFlexVertical gap={16} align="center">
        {statusIcon(
          <CheckOutlined style={{ color: token.colorWhite, fontSize: 24 }} />,
          token.colorPrimary
        )}
        <MyText fontSize={22}>You're in!</MyText>
        <MyTextSecondary fontSize={15} style={{ textAlign: 'center' }}>
          You joined {joinedWorkspace}. Taking you to the dashboard…
        </MyTextSecondary>
      </MyFlexVertical>
    );
  } else if (state === 'wrong-account') {
    body = (
      <MyFlexVertical gap={16} align="center">
        {statusIcon(
          <WarningOutlined
            style={{ color: token.colorWarning, fontSize: 24 }}
          />,
          token.colorWarningBg
        )}
        <MyText fontSize={22}>Wrong account</MyText>
        <MyTextSecondary fontSize={15} style={{ textAlign: 'center' }}>
          {errorMsg}
        </MyTextSecondary>
        <MyButton
          type="primary"
          block
          size="large"
          onClick={() => navigate('/login')}
        >
          Switch account
        </MyButton>
      </MyFlexVertical>
    );
  } else {
    body = (
      <MyFlexVertical gap={16} align="center">
        {statusIcon(
          <CloseOutlined style={{ color: token.colorError, fontSize: 24 }} />,
          token.colorErrorBg
        )}
        <MyText fontSize={22}>Invite invalid</MyText>
        <MyTextSecondary fontSize={15} style={{ textAlign: 'center' }}>
          {errorMsg}
        </MyTextSecondary>
        <MyButton block size="large" onClick={() => navigate('/login')}>
          Back to sign in
        </MyButton>
      </MyFlexVertical>
    );
  }

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      {body}
    </MyCardTransparent>
  );
};

export default Invite;
