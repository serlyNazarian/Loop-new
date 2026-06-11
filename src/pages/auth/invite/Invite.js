import InviteReady from './InviteReady';
import { useEffect, useState } from 'react';
import InviteStatusCard from './InviteStatusCard';
import { getMe } from '../../../actions/authActions';
import { useNavigate, useParams } from 'react-router-dom';
import MyLoader from '../../../components/myLoader/MyLoader';
import {
  getInvitePreview,
  acceptInvite as acceptInviteAction,
} from '../../../actions/workspaceActions';

const Invite = () => {
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

  if (state === 'loading') {
    return <MyLoader message="Loading invite…" />;
  }
  if (state === 'accepting') {
    return (
      <MyLoader
        message={`Joining ${invite?.workspaceName || 'the workspace'}…`}
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
        title="Invite declined"
        subtitle={`You declined the invite to ${invite?.workspaceName}.`}
        actionLabel="Back to sign in"
        actionTo="/login"
      />
    );
  }
  if (state === 'done') {
    return (
      <InviteStatusCard
        variant="success"
        title="You're in!"
        subtitle={`You joined ${joinedWorkspace}. Taking you to the dashboard…`}
      />
    );
  }
  if (state === 'wrong-account') {
    return (
      <InviteStatusCard
        variant="warning"
        title="Wrong account"
        subtitle={errorMsg}
        actionLabel="Switch account"
        actionTo="/login"
        actionPrimary
      />
    );
  }
  return (
    <InviteStatusCard
      variant="error"
      title="Invite invalid"
      subtitle={errorMsg}
      actionLabel="Back to sign in"
      actionTo="/login"
    />
  );
};

export default Invite;
