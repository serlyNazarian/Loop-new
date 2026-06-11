import { theme } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import MyText from '../../../components/myText/MyText';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import { scorePassword, passwordChecks } from '../../../utils/password';

const RegisterPasswordStrength = ({ password }) => {
  const { token } = theme.useToken();
  if (!password) return null;

  const strength = scorePassword(password);
  const strengthColor = token.pwStrength[strength.score];
  const checks = passwordChecks(password);

  return (
    <MyFlexVertical gap={8}>
      <MyFlex gap={4}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 999,
              transition: 'background 200ms ease',
              background:
                i < strength.score ? strengthColor : token.colorFillSecondary,
            }}
          />
        ))}
      </MyFlex>
      <MyText color={strengthColor} fontSize={11}>
        {strength.label}
      </MyText>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 12,
          rowGap: 4,
        }}
      >
        {checks.map((c) => (
          <MyFlex key={c.label} align="center" gap={6}>
            {c.ok ? (
              <CheckOutlined style={{ color: token.pwCheckOk, fontSize: 11 }} />
            ) : (
              <span
                style={{
                  width: 11,
                  height: 11,
                  flexShrink: 0,
                  borderRadius: '50%',
                  border: `1.5px solid ${token.pwCheckOff}`,
                }}
              />
            )}
            <MyText
              color={c.ok ? token.pwCheckOk : token.pwCheckOff}
              fontSize={11}
            >
              {c.label}
            </MyText>
          </MyFlex>
        ))}
      </div>
    </MyFlexVertical>
  );
};

export default RegisterPasswordStrength;
