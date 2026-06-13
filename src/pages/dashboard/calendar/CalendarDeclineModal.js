import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MyModal from '../../../components/myModal/MyModal';
import MyInput from '../../../components/myInput/MyInput';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyTextSecondary from '../../../components/myText/MyTextSecondary';

const MAX_REASON = 300;

const CalendarDeclineModal = ({ open, saving, onClose, onConfirm }) => {
  const { t } = useTranslation();

  const [reason, setReason] = useState('');

  return (
    <MyModal
      open={open}
      width={440}
      styles={{ body: { paddingBottom: 24 } }}
      onCancel={onClose}
      confirmLoading={saving}
      okText={t('cal_decline')}
      title={t('cal_decline_confirm')}
      okButtonProps={{ danger: true }}
      afterClose={() => setReason('')}
      cancelText={t('cal_keep_pending')}
      onOk={() => onConfirm(reason.trim() || undefined)}
    >
      <MyFlexVertical gap={12}>
        <MyTextSecondary fontSize={13}>{t('cal_decline_desc')}</MyTextSecondary>
        <MyInput.TextArea
          rows={3}
          showCount
          value={reason}
          maxLength={MAX_REASON}
          placeholder={t('cal_decline_ph')}
          onChange={(e) => setReason(e.target.value)}
        />
      </MyFlexVertical>
    </MyModal>
  );
};

export default CalendarDeclineModal;
