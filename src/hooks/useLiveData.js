import { useState, useEffect, useCallback } from 'react';
import { getUserByPhone, getActiveTriggers, getClaimsByUser } from '../lib/api';

/**
 * Fetches live backend data: user profile, active triggers, and claims.
 * Returns a `refresh` function so components can manually re-trigger a fetch.
 */
export function useLiveData(phone) {
  const [liveUser, setLiveUser] = useState(null);
  const [triggers, setTriggers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    if (!phone) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch user by phone
      const userResult = await getUserByPhone(phone);
      const user = userResult.success ? userResult.data : null;
      setLiveUser(user);

      // 2. Fetch triggers in parallel with claims (if user found)
      const [triggersResult, claimsResult] = await Promise.all([
        getActiveTriggers(),
        user?._id ? getClaimsByUser(user._id) : Promise.resolve({ data: [] }),
      ]);

      setTriggers(triggersResult.data || []);
      setClaims(claimsResult.data || []);
    } catch (err) {
      setError('Failed to connect to the backend. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [phone]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Expose refresh so any component can trigger a live data re-fetch
  return { liveUser, triggers, claims, loading, error, refresh: fetchAll };
}
