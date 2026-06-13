import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UtilDate from '../../../utils/UtilDate';
import { DURATION_VALUES } from './calendarConstants';
import MyForm from '../../../components/myForm/MyForm';
import MyFlex from '../../../components/myFlex/MyFlex';
import MyModal from '../../../components/myModal/MyModal';
import MyInput from '../../../components/myInput/MyInput';
import MyAlert from '../../../components/myAlert/MyAlert';
import MySelect from '../../../components/mySelect/MySelect';
import MyFormItem from '../../../components/myForm/MyFormItem';
import { createAppointment } from '../../../actions/calendarActions';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyDatePicker from '../../../components/myDatePicker/MyDatePicker';

const CalendarCreateModal = ({ open, defaultDate, onClose, onCreated }) => {
  const { t } = useTranslation();
  const [form] = MyForm.useForm();

  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (values) => {
    setSaving(true);
    setError(null);
    try {
      await createAppointment({
        contactName: values.contactName.trim(),
        contactPhone: values.contactPhone?.trim() || undefined,
        contactEmail: values.contactEmail?.trim() || undefined,
        serviceName: values.serviceName?.trim() || undefined,
        serviceNotes: values.serviceNotes?.trim() || undefined,
        startsAt: values.startsAt.toISOString(),
        durationMin: values.durationMin,
        channel: 'manual',
      });
      onCreated();
    } catch (e) {
      setError(e.message || t('cal_create_error'));
    } finally {
      setSaving(false);
    }
  };

  const initialStart = UtilDate.toDayjs(defaultDate)
    .hour(10)
    .minute(0)
    .second(0);

  const durationOptions = DURATION_VALUES.map((v) => ({
    value: v,
    label: t('cal_minutes', { count: v }),
  }));

  return (
    <MyModal
      open={open}
      width={460}
      destroyOnHidden
      onCancel={onClose}
      confirmLoading={saving}
      onOk={() => form?.submit()}
      title={t('cal_new_appointment')}
      okText={t('cal_create_appointment')}
    >
      <MyForm
        form={form}
        onFinish={submit}
        initialValues={{ startsAt: initialStart, durationMin: 30 }}
      >
        <MyFlexVertical gap={14}>
          {error && <MyAlert type="error" message={error} />}
          <MyFormItem
            name="contactName"
            label={t('cal_customer_name')}
            rules={[{ required: true, message: t('cal_name_required') }]}
          >
            <MyInput placeholder={t('cal_ph_name')} autoFocus />
          </MyFormItem>
          <MyFlex gap={12}>
            <MyFormItem
              className="flex_1"
              name="contactPhone"
              label={t('cal_phone')}
            >
              <MyInput placeholder="+1 555 000 0000" />
            </MyFormItem>
            <MyFormItem
              className="flex_1"
              name="contactEmail"
              label={t('cal_email')}
            >
              <MyInput placeholder="name@email.com" />
            </MyFormItem>
          </MyFlex>
          <MyFlex gap={12}>
            <MyFormItem
              name="startsAt"
              className="flex_1"
              label={t('cal_date_time')}
              rules={[{ required: true, message: t('cal_datetime_required') }]}
            >
              <MyDatePicker showTime format="MMM D, YYYY · h:mm A" />
            </MyFormItem>
            <MyFormItem
              name="durationMin"
              label={t('cal_duration')}
              className="flex_1"
            >
              <MySelect options={durationOptions} />
            </MyFormItem>
          </MyFlex>
          <MyFormItem name="serviceName" label={t('cal_service')}>
            <MyInput placeholder={t('cal_ph_service')} />
          </MyFormItem>
          <MyFormItem name="serviceNotes" label={t('cal_notes')}>
            <MyInput.TextArea rows={3} placeholder={t('cal_ph_notes')} />
          </MyFormItem>
        </MyFlexVertical>
      </MyForm>
    </MyModal>
  );
};

export default CalendarCreateModal;
