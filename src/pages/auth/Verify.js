import { useEffect, useState } from 'react';
import { theme } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MyText from '../../components/myText/MyText';
import MyTextSecondary from '../../components/myText/MyTextSecondary';
import MyLink from '../../components/myLink/MyLink';
import MyButton from '../../components/myButton/MyButton';
import MyOtp from '../../components/myInput/MyOtp';
import MyFlex from '../../components/myFlex/MyFlex';
import MyFlexCenter from '../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import MyCardTransparent from '../../components/myCard/MyCardTransparent';
import { verifyEmail, resendVerification } from '../../actions/authActions';

const RESEND_COOLDOWN = 60;

const Verify = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get('email') || '';

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return undefined;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const verify = async (value) => {
    if (value.length !== 6) {
      setError('Enter the complete 6-digit code');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await verifyEmail(email, value);
      setInfo('Email verified. Redirecting…');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Verification failed');
      setCode('');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (countdown > 0) return;
    setError(null);
    setInfo(null);
    try {
      await resendVerification(email);
      setInfo('Verification code sent. Check your inbox.');
      setCountdown(RESEND_COOLDOWN);
      setCode('');
    } catch (err) {
      setError(err.message || 'Failed to resend code');
    }
  };

  if (!email) {
    return (
      <MyCardTransparent styles={{ body: { padding: 0 } }}>
        <MyFlexVertical gap={20}>
          <MyText fontSize={28}>No email on this link</MyText>
          <MyTextSecondary fontSize={15}>
            We couldn't find a pending verification for this address. Sign in or sign up first to get a fresh code.
          </MyTextSecondary>
          <MyButton type="primary" block size="large" onClick={() => navigate('/login')}>
            Go to sign in
          </MyButton>
        </MyFlexVertical>
      </MyCardTransparent>
    );
  }

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={4}>
          <MyText fontSize={34}>Check your inbox</MyText>
          <MyTextSecondary fontSize={15}>
            We sent a 6-digit code to {email}. It expires in 10 minutes.
          </MyTextSecondary>
        </MyFlexVertical>

        {error && <MyText color={token.colorError} fontSize={13}>{error}</MyText>}
        {info && <MyText color={token.colorSuccess} fontSize={13}>{info}</MyText>}

        <MyFlexVertical gap={18}>
          <MyFlexCenter>
            <MyOtp value={code} onInput={(v) => setCode((v || []).join(''))} onChange={(v) => verify(v)} />
          </MyFlexCenter>
          <MyButton type="primary" block size="large" loading={loading} disabled={code.length !== 6} onClick={() => verify(code)}>
            Verify email
          </MyButton>
        </MyFlexVertical>

        <MyFlex justify="space-between" align="center" wrap="nowrap" gap={12}>
          <MyButton type="link" size="small" onClick={resend} disabled={countdown > 0} style={{ paddingInline: 0 }}>
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend verification code'}
          </MyButton>
          <MyLink to="/login" fontSize={14} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>Back to login</MyLink>
        </MyFlex>
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default Verify;
