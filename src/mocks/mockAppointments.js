let seq = 1000;

const at = (addDays, hour, minute) => {
  const d = new Date();
  d.setDate(d.getDate() + addDays);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const seed = () => [
  {
    id: 'ap_1',
    contactName: 'Maria Lopez',
    contactPhone: '+1 415 555 0132',
    contactEmail: 'maria@example.com',
    serviceName: 'Strategy consultation',
    serviceNotes: 'Wants to review the Q3 rollout plan.',
    startsAt: at(2, 10, 30),
    durationMin: 30,
    timezone: null,
    status: 'confirmed',
    cancelReason: null,
    channel: 'manual',
    conversationId: null,
    createdBy: 'manual',
    createdAt: at(-1, 9, 0),
  },
  {
    id: 'ap_2',
    contactName: 'Priya Shah',
    contactPhone: '+1 415 555 0190',
    contactEmail: null,
    serviceName: 'Onboarding call',
    serviceNotes: null,
    startsAt: at(4, 14, 0),
    durationMin: 45,
    timezone: null,
    status: 'pending',
    cancelReason: null,
    channel: 'telegram',
    conversationId: 'c_42',
    createdBy: 'ai',
    createdAt: at(0, 8, 30),
  },
  {
    id: 'ap_3',
    contactName: 'Tom Reed',
    contactPhone: null,
    contactEmail: 'tom@example.com',
    serviceName: 'Follow-up',
    serviceNotes: null,
    startsAt: at(-2, 9, 0),
    durationMin: 30,
    timezone: null,
    status: 'completed',
    cancelReason: null,
    channel: 'manual',
    conversationId: null,
    createdBy: 'manual',
    createdAt: at(-5, 12, 0),
  },
];

let store = seed();

const byId = (id) => store.find((a) => a.id === id);

export const appointmentHandlers = (method, path) => {
  if (path === '/api/customer/appointments') {
    if (method === 'GET') return () => ({ appointments: store });
    if (method === 'POST')
      return (body) => {
        const appt = {
          id: `ap_${(seq += 1)}`,
          contactName: body?.contactName || 'Customer',
          contactPhone: body?.contactPhone || null,
          contactEmail: body?.contactEmail || null,
          serviceName: body?.serviceName || null,
          serviceNotes: body?.serviceNotes || null,
          startsAt: body?.startsAt,
          durationMin: body?.durationMin || 30,
          timezone: null,
          status: 'confirmed',
          cancelReason: null,
          channel: body?.channel || 'manual',
          conversationId: null,
          createdBy: 'manual',
          createdAt: new Date().toISOString(),
        };
        store = [...store, appt];
        return appt;
      };
  }

  const idMatch = path.match(
    /^\/api\/customer\/appointments\/([^/]+)(\/approve|\/decline)?$/
  );
  if (!idMatch) return undefined;
  const [, id, action] = idMatch;

  if (action === '/approve' && method === 'POST')
    return () => {
      const a = byId(id);
      if (a) a.status = 'confirmed';
      return { id, status: 'confirmed' };
    };
  if (action === '/decline' && method === 'POST')
    return (body) => {
      const a = byId(id);
      if (a) {
        a.status = 'cancelled';
        a.cancelReason = body?.reason || 'Declined';
      }
      return { id, status: 'cancelled' };
    };
  if (method === 'PATCH')
    return (body) => {
      const a = byId(id);
      if (a) Object.assign(a, body);
      return a || { id };
    };
  if (method === 'DELETE')
    return () => {
      store = store.filter((a) => a.id !== id);
      return { success: true };
    };
  return undefined;
};
