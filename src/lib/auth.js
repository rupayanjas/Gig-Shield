export const MOCK_USER = {
  id: 'USR-8932',
  name: 'Ravi Kumar',
  platform: 'Blinkit',
  zone: 'Koramangala, Bengaluru',
  phone: '9876543210',
  baselineIncome: 720,
  coverageTier: {
    name: 'Tier 2',
    icon: '🥈',
    hours: 100
  },
  premium: {
    amount: 79,
    frequency: 'week',
    reason: 'High Risk — Delhi NCR moved to monsoon pricing'
  },
  trustScore: 84,
  platformRating: 4.6,
  policy: {
    status: 'Valid',
    paymentType: 'auto-renewed',
    since: 'Jan 2024'
  },
  claims: [
    {
      id: 'CLM-001',
      title: 'Cancellation Offset',
      description: 'Order #8832 — Rider Cancellation',
      type: 'Order Cancellation',
      amount: null,
      status: 'PROCESSED',
      time: 'Today, 2:45 PM'
    },
    {
      id: 'CLM-002',
      title: 'Weather Protection',
      description: 'Automatic rain activation triggered',
      type: 'City Disruption',
      amount: 216,
      status: 'MONITORING',
      time: 'Today, 11:20 AM'
    },
    {
      id: 'CLM-003',
      title: 'Dark Store Downtime',
      description: 'Inventory system failure',
      type: 'Dark Store Downtime',
      amount: 80,
      status: 'PAID',
      time: 'Yesterday, 5:00 PM'
    }
  ],
  scorecard: {
    period: 'Next Monday',
    zoneName: 'Bengaluru East',
    riskLevel: 'HIGH',
    disruptionProb: 68,
    premiumStatus: 'stable'
  }
};

const USERS_KEY = 'kizuna_registered_users';
const CURRENT_USER_KEY = 'kizuna_current_user';
const SESSION_TOKEN_KEY = 'kizuna_session_token';

// Helper to get all users
const getAllUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [MOCK_USER]; // Default to mock user for dev
};

export const login = (phone, password) => {
  if (!phone) return false;
  
  const users = getAllUsers();
  const user = users.find(u => u.phone === phone);
  
  if (user) {
    // For demo, we accept any password if the phone exists
    const token = btoa(`${phone}:${Date.now()}`);
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return true;
  }
  
  return false;
};

export const register = (phone, profileData) => {
  if (!phone) return false;
  
  const users = getAllUsers();
  
  // Check if user already exists
  if (users.some(u => u.phone === phone)) {
    return false; 
  }
  
  const token = btoa(`${phone}-new-${Date.now()}`);
  sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  
  // Merge the dynamically created profile with the mock outline so they have claims/history
  const fullProfile = {
    ...MOCK_USER,
    ...profileData,
    id: `USR-${Math.floor(Math.random() * 9000) + 1000}`
  };
  
  users.push(fullProfile);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(fullProfile));
  
  return true;
};

export const logout = () => {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem(SESSION_TOKEN_KEY) && !!localStorage.getItem(CURRENT_USER_KEY);
};

export const getUser = () => {
  if (!isAuthenticated()) return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};
