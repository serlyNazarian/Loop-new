import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import HomeSkeletonBar from './HomeSkeletonBar';
import MyFlex from '../../components/myFlex/MyFlex';
import MyText from '../../components/myText/MyText';
import { CaretRightOutlined } from '@ant-design/icons';
import MyButton from '../../components/myButton/MyButton';
import MyFlexCenter from '../../components/myFlex/MyFlexCenter';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../components/myText/MyTextSecondary';
import './HomeDashboardPreview.css';

const HomeDashboardPreview = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  return (
    <div className="hdp_window">
      <MyFlex gap={8} align="center" className="hdp_chrome">
        <MyFlex gap={6}>
          {[0, 1, 2].map((i) => (
            <span key={i} className="hdp_dot" />
          ))}
        </MyFlex>
        <MyTextSecondary fontSize={12}>Loop – Dashboard</MyTextSecondary>
      </MyFlex>
      <div className="hdp_body">
        <MyFlex gap={20} className="hdp_skeleton">
          <MyFlexVertical gap={14} className="hdp_skeleton_side">
            {[60, 90, 80, 70, 100, 75, 85].map((w, i) => (
              <HomeSkeletonBar key={i} width={`${w}%`} />
            ))}
          </MyFlexVertical>
          <MyFlexVertical gap={14} className="flex_1">
            <MyFlex gap={14}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="hdp_stat" />
              ))}
            </MyFlex>
            {[95, 88, 92, 80, 90, 70].map((w, i) => (
              <HomeSkeletonBar key={i} width={`${w}%`} opacity={1 - i * 0.08} />
            ))}
          </MyFlexVertical>
        </MyFlex>
        <MyFlexCenter className="hdp_overlay">
          <MyFlexVertical align="center" gap={12} className="hdp_card">
            <MyFlexCenter className="hdp_play">
              <CaretRightOutlined className="hdp_play_icon" />
            </MyFlexCenter>
            <MyText
              bold
              fontSize={11}
              color={token.colorPrimary}
              className="hdp_demo_label"
            >
              INTERACTIVE DEMO
            </MyText>
            <MyText fontSize={20} bold>
              Start the interactive experience
            </MyText>
            <MyTextSecondary fontSize={13}>
              Explore Loop's full dashboard — conversations, AI agents,
              broadcasts, and more.
            </MyTextSecondary>
            <MyButton
              type="primary"
              size="large"
              onClick={() => navigate('/register')}
              style={{
                border: 'none',
                background: token.brandGradient,
                boxShadow: token.brandButtonShadow,
                borderRadius: token.borderRadiusPill,
              }}
            >
              Request Access
            </MyButton>
          </MyFlexVertical>
        </MyFlexCenter>
      </div>
    </div>
  );
};

export default HomeDashboardPreview;
