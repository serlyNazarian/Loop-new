import { theme } from 'antd';
import { TOTAL_STEPS } from './registerConstants';
import MyFlex from '../../../components/myFlex/MyFlex';

const RegisterStepsSection = ({ step }) => {
  const { token } = theme.useToken();

  return (
    <MyFlex gap={8} justify="center">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 6,
            width: step === i + 1 ? 28 : 8,
            borderRadius: 999,
            background:
              i + 1 <= step ? token.colorPrimary : token.colorFillSecondary,
            transition: 'width 200ms ease, background 200ms ease',
          }}
        />
      ))}
    </MyFlex>
  );
};

export default RegisterStepsSection;
