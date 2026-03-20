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

export const login = (phone, platformId) => {
  if (!phone || !platformId) return false;
  
  // Accept any login for demo
  const token = btoa(`${phone}:${platformId}-${Date.now()}`);
  sessionStorage.setItem('gigshield_session_token', token);
  localStorage.setItem('gigshield_user_profile', JSON.stringify(MOCK_USER));
  return true;
};

export const logout = () => {
  sessionStorage.removeItem('gigshield_session_token');
  // keep localStorage profile to not lose demographic data if needed, but for security usually wipe it
  localStorage.removeItem('gigshield_user_profile');
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem('gigshield_session_token') && !!localStorage.getItem('gigshield_user_profile');
};

export const getUser = () => {
  if (!isAuthenticated()) return null;
  const user = localStorage.getItem('gigshield_user_profile');
  return user ? JSON.parse(user) : null;
};
