import HomeHero from './HomeHero';
import HomeBackground from './HomeBackground';
import useWindowSize from '../../hooks/useWindowSize';
import HomeDashboardPreview from './HomeDashboardPreview';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';

const Home = () => {
  const { isMobile } = useWindowSize();

  return (
    <div
      style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <HomeBackground />
      <MyFlexVertical
        align="center"
        gap={48}
        style={{
          position: 'relative',
          zIndex: 1,
          padding: isMobile ? '80px 20px 40px' : '120px 24px 64px',
        }}
      >
        <HomeHero />
        {!isMobile && (
          <div style={{ width: '100%', maxWidth: 880 }}>
            <HomeDashboardPreview />
          </div>
        )}
      </MyFlexVertical>
    </div>
  );
};

export default Home;
