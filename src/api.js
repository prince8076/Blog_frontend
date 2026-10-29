// Single place for the backend address. Posts and auth both live on Render:
// login/signup previously pointed at a Vercel deployment that now sits
// behind deployment protection, which is why auth broke while posts worked.
export const API_BASE = 'https://blog-backend-fd7d.onrender.com';

const CACHE_KEY = 'inkwave_posts_v2';
const SESSION_KEY = 'inkwave_posts_cache';

export function clearPostsCache() {
  try { localStorage.removeItem(CACHE_KEY); } catch (e) {}
  try { sessionStorage.removeItem(CACHE_KEY); } catch (e) {}
  try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
}

// Persistent cache: a returning reader should never wait for the free
// backend to wake up again. Cache lives in localStorage (days, not a
// session), and is only a starting point — callers revalidate in the
// background and replace it with live data when that arrives.
export function getCachedPosts() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Array.isArray(cached.posts) && cached.posts.length) return cached.posts;
  } catch (e) {}
  try {
    const cached = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    if (cached && Array.isArray(cached.posts) && cached.posts.length) return cached.posts;
  } catch (e) {}
  return null;
}

function storePosts(posts) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), posts })); } catch (e) {}
}

export async function fetchPostsFresh() {
  const response = await fetch(`${API_BASE}/api/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  const posts = await response.json();
  if (!Array.isArray(posts)) throw new Error('Failed to fetch posts');
  storePosts(posts);
  return posts;
}

// Kept for callers that want a simple await (search, admin). List pages
// should use usePosts instead, so they can paint from cache first.
export async function getPosts() {
  const cached = getCachedPosts();
  if (cached) {
    // Fire-and-forget refresh in the background; the caller already has data.
    fetchPostsFresh().catch(() => {});
    return cached;
  }
  return fetchPostsFresh();
}

// Pexels serves full-size images unless asked otherwise. Most post images
// in the data have no size parameters, so ask for a compressed, sized
// version instead of downloading the original on every card.
export function optimizeImage(url, width = 800) {
  if (!url || typeof url !== 'string') return '';
  if (!url.includes('images.pexels.com')) return url;
  const base = url.split('?')[0];
  return `${base}?auto=compress&cs=tinysrgb&w=${width}`;
}

// Derived from the excerpt's own word count, not an invented metric.
export function readingTime(excerpt) {
  const words = (excerpt || '').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
