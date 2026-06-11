import { useState } from 'react';
import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../actions/authActions';
import MyForm from '../../../components/myForm/MyForm';
import MyText from '../../../components/myText/MyText';
import RegisterAccountStep from './RegisterAccountStep';
import RegisterDetailsStep from './RegisterDetailsStep';
import RegisterStepsSection from './RegisterStepsSection';
import RegisterHeaderSection from './RegisterHeaderSection';
import SocialLoginButtons from '../login/SocialLoginButtons';
import RegisterOnboardingStep from './RegisterOnboardingStep';
import MyDivider from '../../../components/myDivider/MyDivider';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyCardTransparent from '../../../components/myCard/MyCardTransparent';

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const Register = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [form] = MyForm.useForm();

  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const goToStep2 = async () => {
    setError(null);
    try {
      await form.validateFields([
        'firstName',
        'email',
        'password',
        'confirm',
        'agree',
      ]);
      setStep(2);
    } catch {
      setStep(1);
    }
  };

  const startGoogle = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };
  const focusEmail = () => form.getFieldInstance('email')?.focus();

  const onFinish = async (v) => {
    setError(null);
    setLoading(true);
    try {
      await signup({
        email: v.email.trim(),
        password: v.password,
        firstName: v.firstName.trim(),
        lastName: v.lastName?.trim() || undefined,
        phone: v.phone?.trim() || undefined,
        companyName: v.companyName?.trim() || undefined,
        onboardingData: {
          heardAbout: v.heardAbout || undefined,
          useCase: v.useCase || undefined,
          teamSize: v.teamSize || undefined,
        },
      });
      navigate(`/verify?email=${encodeURIComponent(v.email.trim())}`);
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.');
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyCardTransparent styles={{ body: { padding: 0 } }}>
      <MyFlexVertical gap={24}>
        <MyFlexVertical gap={12}>
          <RegisterHeaderSection />
          <RegisterStepsSection step={step} />
        </MyFlexVertical>
        {error && (
          <MyText color={token.colorError} fontSize={13}>
            {error}
          </MyText>
        )}
        <MyForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
          validateTrigger={[]}
          requiredMark="optional"
        >
          {step === 1 && (
            <RegisterAccountStep form={form} onContinue={goToStep2} />
          )}
          {step === 2 && (
            <RegisterDetailsStep
              onBack={() => setStep(1)}
              onContinue={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <RegisterOnboardingStep
              onBack={() => setStep(2)}
              loading={loading}
            />
          )}
        </MyForm>
        {step === 1 && (
          <>
            <MyDivider style={{ fontSize: 11, letterSpacing: '0.08em' }}>
              OR REGISTER WITH
            </MyDivider>
            <SocialLoginButtons
              startGoogle={startGoogle}
              startEmailLink={focusEmail}
            />
          </>
        )}
      </MyFlexVertical>
    </MyCardTransparent>
  );
};

export default Register;
