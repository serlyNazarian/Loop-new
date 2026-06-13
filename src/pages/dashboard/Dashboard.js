import { Row, Col, Alert } from 'antd';
import api from '../../utils/apiClient';
import { useEffect, useState } from 'react';
import DashboardHero from './DashboardHero';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../stores/authStore';
import MySpinner from '../../components/mySpinner/MySpinner';
import MyFlexVertical from '../../components/myFlex/MyFlexVertical';
import MyCardStatistic from '../../components/myCardStatistic/MyCardStatistic';

const Dashboard = () => {
  const { t } = useTranslation();

  const user = useAuthStore((s) => s.user);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    api
      .get('/api/customer/overview-snapshot', { signal: controller.signal })
      .then((data) => setSnapshot(data))
      .catch((err) => {
        if (err.name !== 'AbortError')
          setError(err.message || 'Could not load your overview.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const firstName = (user?.name || '').split(' ')[0] || 'there';

  const stats = [
    {
      key: 'conversations',
      label: t('dashboard_conversations'),
      value: snapshot?.conversations,
    },
    {
      key: 'messages',
      label: t('dashboard_messages'),
      value: snapshot?.messages,
    },
    {
      key: 'bookings',
      label: t('dashboard_bookings'),
      value: snapshot?.bookings,
    },
    {
      key: 'customers',
      label: t('dashboard_customers'),
      value: snapshot?.customers,
    },
  ];

  return (
    <MyFlexVertical gap={20}>
      <DashboardHero name={firstName} snapshot={snapshot} />
      {error && <Alert showIcon type="error" message={error} />}
      {loading ? (
        <MySpinner />
      ) : (
        <Row gutter={[16, 16]}>
          {stats?.map((s) => (
            <Col xs={24} sm={12} lg={6} key={s.key}>
              <MyCardStatistic
                title={s.label}
                value={s.value ?? 0}
                cardProps={{ variant: 'outlined' }}
              />
            </Col>
          ))}
        </Row>
      )}
    </MyFlexVertical>
  );
};

export default Dashboard;
