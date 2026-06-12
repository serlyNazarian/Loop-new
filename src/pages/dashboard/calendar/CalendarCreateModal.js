import dayjs from 'dayjs';
import { useState } from 'react';
import MyForm from '../../../components/myForm/MyForm';
import MyFlex from '../../../components/myFlex/MyFlex';
import { DURATION_OPTIONS } from './calendarConstants';
import MyModal from '../../../components/myModal/MyModal';
import MyInput from '../../../components/myInput/MyInput';
import MyAlert from '../../../components/myAlert/MyAlert';
import MySelect from '../../../components/mySelect/MySelect';
import MyButton from '../../../components/myButton/MyButton';
import MyFormItem from '../../../components/myForm/MyFormItem';
import { createAppointment } from '../../../actions/calendarActions';
import MyFlexVertical from '../../../components/myFlex/MyFlexVertical';
import MyDatePicker from '../../../components/myDatePicker/MyDatePicker';

const CalendarCreateModal = ({ open, defaultDate, onClose, onCreated }) => {
  const [form] = MyForm.useForm();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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
      setError(e.message || 'Could not create appointment.');
    } finally {
      setSaving(false);
    }
  };

  const initialStart = (defaultDate ? dayjs(defaultDate) : dayjs())
    .hour(10)
    .minute(0)
    .second(0);

  return (
    <MyModal
      open={open}
      width={460}
      footer={null}
      destroyOnHidden
      onCancel={onClose}
      title="New appointment"
    >
      <MyForm
        form={form}
        layout="vertical"
        onFinish={submit}
        initialValues={{ startsAt: initialStart, durationMin: 30 }}
      >
        <MyFlexVertical gap={14}>
          {error && <MyAlert type="error" message={error} />}
          <MyFormItem
            name="contactName"
            label="Customer name"
            rules={[{ required: true, message: 'Customer name is required' }]}
          >
            <MyInput placeholder="Jane Doe" autoFocus />
          </MyFormItem>
          <MyFlex gap={12}>
            <MyFormItem name="contactPhone" label="Phone" className="flex_1">
              <MyInput placeholder="+1 555 000 0000" />
            </MyFormItem>
            <MyFormItem name="contactEmail" label="Email" className="flex_1">
              <MyInput placeholder="name@email.com" />
            </MyFormItem>
          </MyFlex>
          <MyFlex gap={12}>
            <MyFormItem
              name="startsAt"
              label="Date & time"
              className="flex_1"
              rules={[{ required: true, message: 'Pick a date & time' }]}
            >
              <MyDatePicker
                showTime
                format="MMM D, YYYY · h:mm A"
                className="w_100"
              />
            </MyFormItem>
            <MyFormItem name="durationMin" label="Duration" className="flex_1">
              <MySelect options={DURATION_OPTIONS} />
            </MyFormItem>
          </MyFlex>
          <MyFormItem name="serviceName" label="Service">
            <MyInput placeholder="e.g. Haircut" />
          </MyFormItem>
          <MyFormItem name="serviceNotes" label="Notes">
            <MyInput.TextArea
              rows={3}
              placeholder="Anything the customer should know"
            />
          </MyFormItem>
          <MyFlex gap={8} justify="flex-end">
            <MyButton onClick={onClose}>Cancel</MyButton>
            <MyButton type="primary" htmlType="submit" loading={saving}>
              Create appointment
            </MyButton>
          </MyFlex>
        </MyFlexVertical>
      </MyForm>
    </MyModal>
  );
};

export default CalendarCreateModal;
