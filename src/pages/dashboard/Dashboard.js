import { useEffect, useState } from 'react';
import { Row, Col, Statistic, Spin, Alert } from 'antd';
import {
  MessageOutlined,
  ContactsOutlined,
  RobotOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import api from '../../utils/apiClient';
import useAuthStore from '../../stores/authStore';
import MyCard from '../../components/myCard/MyCard';
import MyFlexCenter from '../../components/myFlex/MyFlexCenter';
import MyPageHeader from '../../components/myPageHeader/MyPageHeader';

const Dashboard = () => {
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
      label: 'Conversations',
      icon: <MessageOutlined />,
      value: snapshot?.totalConversations,
    },
    {
      key: 'contacts',
      label: 'Contacts',
      icon: <ContactsOutlined />,
      value: snapshot?.totalContacts,
    },
    {
      key: 'aiReplies',
      label: 'AI replies',
      icon: <RobotOutlined />,
      value: snapshot?.aiReplies,
    },
    {
      key: 'resolved',
      label: 'Resolved',
      icon: <CheckCircleOutlined />,
      value: snapshot?.resolved,
    },
  ];

  return (
    <div>
      <MyPageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Here's what's happening across your channels."
      />

      {error && (
        <Alert
          type="error"
          showIcon
          message={error}
          style={{ marginBottom: 16 }}
        />
      )}

      {loading ? (
        <MyFlexCenter style={{ minHeight: '40vh' }}>
          <Spin size="large" />
        </MyFlexCenter>
      ) : (
        <Row gutter={[16, 16]}>
          {stats.map((s) => (
            <Col xs={24} sm={12} lg={6} key={s.key}>
              <MyCard variant="outlined">
                <Statistic
                  title={s.label}
                  value={s.value ?? 0}
                  prefix={s.icon}
                />
              </MyCard>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
