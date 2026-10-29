import { useState, useEffect, useCallback } from 'react';
import { getCachedPosts, fetchPostsFresh } from '../api';
import { fallbackPosts } from '../data/fallbackPosts';

// The lag fix, in one place. Render's free backend took 44s cold and
// ~1.1s warm on 2026-10-29, so waiting for it before painting anything
// is what made the site feel broken. This hook paints instantly from
// (in order) a saved cache, or a snapshot of the real posts, then
// revalidates in the background and swaps in live data when it arrives.
// While the snapshot is showing, isSnapshot is true so the UI can say so.
export function usePosts() {
  const cached = getCachedPosts();
  const [posts, setPosts] = useState(cached || fallbackPosts);
  const [isSnapshot, setIsSnapshot] = useState(!cached);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      const fresh = await fetchPostsFresh();
      setPosts(fresh);
      setIsSnapshot(false);
    } catch (err) {
      // Keep showing cache/snapshot; the page is still readable.
      setError('The backend is still waking up. Showing saved articles for now.');
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { posts, isSnapshot, isRefreshing, error, refresh };
}
