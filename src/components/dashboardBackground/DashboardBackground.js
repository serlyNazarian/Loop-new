import './DashboardBackground.css';

export default function DashboardBackground() {
  return (
    <div className="dashboard_bg" aria-hidden>
      <div className="dashboard_bg_layer dashboard_bg_base" />
      <div className="dashboard_bg_layer dashboard_bg_aurora" />
      <div className="dashboard_bg_layer dashboard_bg_dots" />
      <div className="dashboard_bg_layer dashboard_bg_vignette" />
    </div>
  );
}
