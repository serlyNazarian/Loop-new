const MS_PER_MIN = 60000;
const now = Date.now();
const minsAgo = (m) => new Date(now - m * MS_PER_MIN).toISOString();

export const mockOverview = {
  totalConversations: 0,
  totalContacts: 0,
  aiReplies: 0,
  resolved: 0,
};

export const mockUser = {
  id: 'u_1',
  name: 'Serly Nazarian',
  email: 'serly@useloop.dev',
  profileImageUrl: null,
  presenceStatus: 'online',
};

export const mockWorkspaces = [
  { id: 'ws_1', name: "Serly's Workspace", role: 'owner', permissions: null },
  {
    id: 'ws_2',
    name: 'Acme Support',
    role: 'member',
    permissions: ['conversations', 'contacts', 'calendar'],
  },
];

export const mockNotifications = {
  assignments: [
    {
      id: 'a1',
      contactName: 'Maria Lopez',
      assignedByName: 'Alex',
      channel: 'whatsapp',
      conversationId: 'c1',
      assignedAt: minsAgo(3),
    },
  ],
  mentions: [
    {
      id: 'm1',
      contactName: 'John Carter',
      mentionedByName: 'Dana',
      preview: 'can you take this one?',
      channel: 'instagram',
      conversationId: 'c2',
      mentionedAt: minsAgo(12),
    },
  ],
  pendingAppointments: [{ id: 'p1', contactName: 'Priya Shah' }],
  cancelledAppointments: [
    { id: 'cx1', contactName: 'Tom Reed', cancelledAt: minsAgo(140) },
  ],
  unreadChats: [
    {
      id: 'h1',
      contactName: 'Liam Walsh',
      lastMessagePreview: 'Thanks, that worked!',
      channel: 'email',
      lastMessageAt: minsAgo(45),
    },
    {
      id: 'h2',
      contactName: 'Sofia Rossi',
      lastMessagePreview: 'Is the order shipped yet?',
      channel: 'whatsapp',
      lastMessageAt: minsAgo(80),
    },
  ],
};
