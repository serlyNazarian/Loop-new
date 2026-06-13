import InviteReady from './InviteReady';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InviteStatusCard from './InviteStatusCard';
import { getMe } from '../../../actions/authActions';
import { useNavigate, useParams } from 'react-router-dom';
import MyLoader from '../../../components/myLoader/MyLoader';
import {
  getInvitePreview,
  acceptInvite as acceptInviteAction,
} from '../../../actions/workspaceActions';

const Invite = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token: inviteToken } = useParams();

  const [invite, setInvite] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [state, setState] = useState('loading');
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
        setErrorMsg(err.message || t('invite_error_invalid_or_expired'));
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, [inviteToken, navigate, t]);

  const acceptInvite = async () => {
    setState('accepting');
    try {
      const data = await acceptInviteAction(inviteToken);
      setJoinedWorkspace(
        data.workspaceName ||
          invite?.workspaceName ||
          t('invite_fallback_workspace')
      );
      setState('done');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      if (err.status === 403) {
        setState('wrong-account');
        setErrorMsg(err.message || t('invite_error_wrong_account'));
      } else {
        setState('error');
        setErrorMsg(err.message || t('invite_error_accept_failed'));
      }
    }
  };

  const declineInvite = () => setState('declined');

  if (state === 'loading') {
    return <MyLoader message={t('invite_loading')} />;
  }
  if (state === 'accepting') {
    return (
      <MyLoader
        message={t('invite_joining', {
          workspaceName:
            invite?.workspaceName || t('invite_fallback_workspace'),
        })}
      />
    );
  }
  if (state === 'ready' && invite) {
    return (
      <InviteReady
        invite={invite}
        onAccept={acceptInvite}
        onDecline={declineInvite}
      />
    );
  }
  if (state === 'declined') {
    return (
      <InviteStatusCard
        variant="neutral"
        title={t('invite_declined_title')}
        subtitle={t('invite_declined_subtitle', {
          workspaceName: invite?.workspaceName,
        })}
        actionLabel={t('invite_back_to_sign_in')}
        actionTo="/login"
      />
    );
  }
  if (state === 'done') {
    return (
      <InviteStatusCard
        variant="success"
        title={t('invite_done_title')}
        subtitle={t('invite_done_subtitle', { workspaceName: joinedWorkspace })}
      />
    );
  }
  if (state === 'wrong-account') {
    return (
      <InviteStatusCard
        variant="warning"
        title={t('invite_wrong_account_title')}
        subtitle={errorMsg}
        actionLabel={t('invite_switch_account')}
        actionTo="/login"
        actionPrimary
      />
    );
  }
  return (
    <InviteStatusCard
      variant="error"
      title={t('invite_invalid_title')}
      subtitle={errorMsg}
      actionLabel={t('invite_back_to_sign_in')}
      actionTo="/login"
    />
  );
};

export default Invite;
