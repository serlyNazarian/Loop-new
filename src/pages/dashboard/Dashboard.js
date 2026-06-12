import { useEffect, useState } from 'react';
import {
  MessageOutlined,
  ContactsOutlined,
  RobotOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import api from '../../utils/apiClient';
import { Row, Col, Spin, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../stores/authStore';
import MyFlexCenter from '../../components/myFlex/MyFlexCenter';
import MyPageHeader from '../../components/myPageHeader/MyPageHeader';
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
      icon: <MessageOutlined />,
      value: snapshot?.totalConversations,
    },
    {
      key: 'contacts',
      label: t('dashboard_contacts'),
      icon: <ContactsOutlined />,
      value: snapshot?.totalContacts,
    },
    {
      key: 'aiReplies',
      label: t('dashboard_ai_replies'),
      icon: <RobotOutlined />,
      value: snapshot?.aiReplies,
    },
    {
      key: 'resolved',
      label: t('dashboard_resolved'),
      icon: <CheckCircleOutlined />,
      value: snapshot?.resolved,
    },
  ];

  return (
    <>
      <MyPageHeader
        title={t('dashboard_welcome', { name: firstName })}
        subtitle={t('dashboard_subtitle')}
      />
      {error && (
        <Alert
          showIcon
          type="error"
          message={error}
          style={{ marginBottom: 16 }}
        />
      )}
      {loading ? (
        <MyFlexCenter style={{ minHeight: '15vh' }}>
          <Spin size="large" />
        </MyFlexCenter>
      ) : (
        <Row gutter={[16, 16]}>
          {stats?.map((s) => (
            <Col xs={24} sm={12} lg={6} key={s.key}>
              <MyCardStatistic
                title={s.label}
                prefix={s.icon}
                value={s.value ?? 0}
                cardProps={{ variant: 'outlined' }}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Dashboard;
