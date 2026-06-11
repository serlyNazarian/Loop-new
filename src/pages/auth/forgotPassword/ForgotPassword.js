import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordDone from './ForgotPasswordDone';
import MyForm from '../../../components/myForm/MyForm';
import ForgotPasswordOtpStep from './ForgotPasswordOtpStep';
import ForgotPasswordEmailStep from './ForgotPasswordEmailStep';
import ForgotPasswordPasswordStep from './ForgotPasswordPasswordStep';
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
    } catch (err) {
      if (err.status === 0) {
        setError(err.message || 'Failed to send code');
        setLoading(false);
        return;
      }
    }
    setEmail(trimmed);
    setStep('otp');
    setCountdown(RESEND_COOLDOWN);
    setLoading(false);
  };

  const resend = async () => {
    if (countdown > 0) return;
    setError(null);
    setInfo(null);
    try {
      await forgotPassword(email);
    } catch (err) {
      if (err.status === 0) {
        setError(err.message || 'Failed to resend code');
        return;
      }
    }
    setInfo('Code resent! Check your email.');
    setCountdown(RESEND_COOLDOWN);
    setCode('');
  };

  const goToPassword = () => {
    setError(null);
    setStep('password');
  };

  const reset = async ({ password }) => {
    setError(null);
    setLoading(true);
    try {
      await resetPassword({ email, code, password });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return <ForgotPasswordDone onGoToLogin={() => navigate('/login')} />;
  }

  if (step === 'email') {
    return <ForgotPasswordEmailStep form={emailForm} onFinish={sendCode} loading={loading} error={error} />;
  }

  if (step === 'otp') {
    return (
      <ForgotPasswordOtpStep
        email={email}
        code={code}
        setCode={setCode}
        onContinue={goToPassword}
        onResend={resend}
        countdown={countdown}
        info={info}
        error={error}
      />
    );
  }

  return (
    <ForgotPasswordPasswordStep
      form={resetForm}
      onFinish={reset}
      loading={loading}
      error={error}
      onBack={() => {
        setError(null);
        setStep('otp');
      }}
    />
  );
};

export default ForgotPassword;
