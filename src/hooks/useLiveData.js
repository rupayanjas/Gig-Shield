import { useState, useEffect } from 'react';

/**
 * Fetches live backend data: user profile, active triggers, and claims.
 * The "phone" param is used to look up the real user in the DB.
 */
export function useLiveData(phone) {
  const [liveUser, setLiveUser] = useState(null);
  const [triggers, setTriggers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!phone) return;

    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch all users and find the one that matches our phone
        const usersRes = await fetch('/api/test');
        const usersData = await usersRes.json();

        const matchedUser = usersData.data?.find(u => u.phone === phone) || null;
        setLiveUser(matchedUser);

        // 2. Fetch active triggers
        const triggersRes = await fetch('/api/trigger');
        const triggersData = await triggersRes.json();
        setTriggers(triggersData.data || []);

        // 3. If we found the user, fetch their claims
        if (matchedUser?._id) {
          const claimsRes = await fetch(`/api/claim?userId=${matchedUser._id}`);
          const claimsData = await claimsRes.json();
          setClaims(claimsData.data || []);
        }
      } catch (err) {
        setError('Failed to fetch live data from backend.');
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [phone]);

  return { liveUser, triggers, claims, loading, error };
}
