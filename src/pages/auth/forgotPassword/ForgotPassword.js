import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordDone from './ForgotPasswordDone';
import MyForm from '../../../components/myForm/MyForm';
import ForgotPasswordCodeStep from './ForgotPasswordCodeStep';
import ForgotPasswordEmailStep from './ForgotPasswordEmailStep';
import { forgotPassword, resetPassword } from '../../../actions/authActions';

const RESEND_COOLDOWN = 60;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailForm] = MyForm.useForm();
  const [resetForm] = MyForm.useForm();

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return undefined;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const sendCode = async ({ email: value }) => {
    const trimmed = value.trim();
    setError(null);
    setLoading(true);
    try {
      await forgotPassword(trimmed);
      setEmail(trimmed);
      setStep('code');
      setCountdown(RESEND_COOLDOWN);
    } catch (err) {
      setError(err.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (countdown > 0) return;
    setError(null);
    setInfo(null);
    try {
      await forgotPassword(email);
      setInfo('Code resent. Check your email.');
      setCountdown(RESEND_COOLDOWN);
      setCode('');
    } catch (err) {
      setError(err.message || 'Failed to resend code');
    }
  };

  const reset = async ({ password }) => {
    setError(null);
    if (code.length !== 6) {
      setError('Enter the 6-digit code');
      return;
    }
    setLoading(true);
    try {
      await resetPassword({ email, code, password });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      setCode('');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return <ForgotPasswordDone onGoToLogin={() => navigate('/login')} />;
  }

  if (step === 'email') {
    return (
      <ForgotPasswordEmailStep
        error={error}
        form={emailForm}
        loading={loading}
        onFinish={sendCode}
      />
    );
  }

  return (
    <ForgotPasswordCodeStep
      code={code}
      info={info}
      email={email}
      error={error}
      form={resetForm}
      onFinish={reset}
      setCode={setCode}
      loading={loading}
      onResend={resend}
      countdown={countdown}
    />
  );
};

export default ForgotPassword;
