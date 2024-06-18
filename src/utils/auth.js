export const logout = async (url, cacheName = "api-cache") => {
  const cache = await caches.open(cacheName);
  await cache.delete(url);
};
