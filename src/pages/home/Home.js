import HomeHero from './HomeHero';
import HomeBackground from './HomeBackground';
import useWindowSize from '../../hooks/useWindowSize';
import HomeDashboardPreview from './HomeDashboardPreview';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import './Home.css';

const Home = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="home_root">
      <HomeBackground />
      <MyFlexVertical
        align="center"
        gap={48}
        className="home_content"
        style={{ padding: isMobile ? '80px 20px 40px' : '120px 24px 64px' }}
      >
        <HomeHero />
        {!isMobile && (
          <div className="home_preview">
            <HomeDashboardPreview />
          </div>
        )}
      </MyFlexVertical>
    </div>
  );
};

export default Home;
