import { useNavigate } from 'react-router-dom';
import MyTag from '../../components/myTag/MyTag';
import './DashboardHero.css';

const DashboardHeroPill = ({ color, to, label }) => {
  const navigate = useNavigate();

  return (
    <MyTag color={color} className="pointer" onClick={() => navigate(to)}>
      <span className="dashboard_hero_dot" />
      {label}
    </MyTag>
  );
};

export default DashboardHeroPill;
