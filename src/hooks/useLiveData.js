import { useState, useEffect, useCallback } from 'react';
import { getDashboardData } from '../lib/api';

/**
 * useLiveData — fetches all dashboard data in a single API call.
 *
 * Performance optimisations:
 * - One HTTP request instead of three (user + claims + triggers)
 * - Backend uses Promise.all + .lean() for minimal DB overhead
 * - Uses useCallback so the ref-stable `refresh` fn never triggers extra renders
 *
 * Returns:
 *   liveUser, triggers, claims  — data
 *   loading                     — true on first fetch and on manual refresh
 *   error                       — string if something failed, otherwise null
 *   refresh                     — call after mutations (simulate event, etc.)
 */
export function useLiveData(phone) {
  const [liveUser, setLiveUser]   = useState(null);
  const [triggers, setTriggers]   = useState([]);
  const [claims, setClaims]       = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  const fetchAll = useCallback(async () => {
    if (!phone) return;
    setLoading(true);
    setError(null);

    try {
      const result = await getDashboardData(phone);

      if (result.success) {
        const { user, claims: c, triggers: t } = result.data;
        setLiveUser(user);
        setClaims(c || []);
        setTriggers(t || []);
      } else {
        // User not in DB yet — non-blocking; show empty state
        setLiveUser(null);
        setClaims([]);
        setTriggers([]);
        if (result.message !== 'User not found.') {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('Could not connect to backend. Check your network.');
    } finally {
      setLoading(false);
    }
  }, [phone]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { liveUser, triggers, claims, loading, error, refresh: fetchAll };
}
