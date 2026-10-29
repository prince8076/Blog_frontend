// Single place for the backend address. Previously every component hardcoded
// a different URL (posts on Render, login/signup on a Vercel deployment that
// now sits behind deployment protection), which is why auth broke while
// posts still worked. The Render backend serves both /api/posts and
// /api/login + /api/signup, so everything points here now.
export const API_BASE = 'https://blog-backend-fd7d.onrender.com';

const CACHE_KEY = 'inkwave_posts_cache';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes, per browser tab session

export function clearPostsCache() {
  try { sessionStorage.removeItem(CACHE_KEY); } catch (e) { /* private mode */ }
}

// Fetch the post list, reusing a fresh session cache so moving between
// Home / Landing / Search does not re-wake the free backend every time.
// The first load can still take ~30s while Render wakes up; callers show
// LoadingState for that, instead of a bare "Loading...".
export async function getPosts() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Array.isArray(cached.posts) && Date.now() - cached.at < CACHE_TTL_MS) {
      return cached.posts;
    }
  } catch (e) { /* ignore a corrupt cache and fetch fresh */ }
  const response = await fetch(`${API_BASE}/api/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  const posts = await response.json();
  if (!Array.isArray(posts)) throw new Error('Failed to fetch posts');
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), posts })); } catch (e) {}
  return posts;
}
