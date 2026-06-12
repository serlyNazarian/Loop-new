import './Home.css';

const HomeBackground = () => {
  return (
    <div className="home_bg" aria-hidden>
      <div className="home_bg_layer home_bg_base" />
      <div className="home_bg_layer home_bg_aurora" />
      <div className="home_bg_layer home_bg_dots" />
      <div className="home_bg_layer home_bg_vignette" />
      <div className="home_bg_fade" />
    </div>
  );
};

export default HomeBackground;
