import UtilDate from '../../utils/UtilDate';
import { useTranslation } from 'react-i18next';
import MyText from '../../components/myText/MyText';
import MyFlex from '../../components/myFlex/MyFlex';
import MyCard from '../../components/myCard/MyCard';
import DashboardHeroPill from './DashboardHeroPill';
import MySpinner from '../../components/mySpinner/MySpinner';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../components/myText/MyTextSecondary';
import './DashboardHero.css';

const greetingKey = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'home_greeting_morning';
  if (hour < 17) return 'home_greeting_afternoon';
  return 'home_greeting_evening';
};

const DashboardHero = ({ name, snapshot }) => {
  const { t } = useTranslation();

  const pending = snapshot?.pendingCount ?? 0;
  const cancelled = snapshot?.cancelledTodayCount ?? 0;
  const waiting = snapshot?.waitingHandoffCount ?? 0;
  const today = snapshot?.todayCount ?? 0;
  const attention = pending + cancelled + waiting;
  const loading = !snapshot;

  const pills = [
    {
      name: 'waiting',
      count: waiting,
      color: 'blue',
      to: '/dashboard/conversations',
    },
    {
      name: 'pending',
      count: pending,
      color: 'gold',
      to: '/dashboard/calendar',
    },
    {
      name: 'cancelled',
      count: cancelled,
      color: 'red',
      to: '/dashboard/calendar',
    },
  ].filter((pill) => pill.count > 0);

  const headline =
    attention > 0
      ? t('home_hero_attention', { count: attention })
      : today > 0
        ? t('home_hero_today', { count: today })
        : t('home_hero_clear');

  return (
    <MyCard className="dashboard_hero" block>
      {loading ? (
        <MySpinner minHeight={104} />
      ) : (
        <MyFlexVertical gap={16} className="dashboard_hero_content">
          <MyFlexVertical gap={2}>
            <MyText bold fontSize={28}>
              {t(greetingKey())}, {name}
            </MyText>
            <MyTextSecondary fontSize={13}>
              {UtilDate.now().format('dddd, MMMM D')} · {headline}
            </MyTextSecondary>
          </MyFlexVertical>
          {pills.length > 0 && (
            <MyFlex gap={8} wrap="wrap">
              {pills.map((pill) => (
                <DashboardHeroPill
                  key={pill.name}
                  color={pill.color}
                  to={pill.to}
                  label={t(`home_hero_${pill.name}`, { count: pill.count })}
                />
              ))}
            </MyFlex>
          )}
        </MyFlexVertical>
      )}
    </MyCard>
  );
};

export default DashboardHero;
