const CACHE_NAME = "api-cache";
const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
// const EXPIRATION_TIME = 1000; // 1 hour in milliseconds

export const fetchDataAndCache = async (
  url,
  cacheName = CACHE_NAME,
  expirationTime = EXPIRATION_TIME
) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const cache = await caches.open(cacheName);
    const expiryTime = new Date().getTime() + expirationTime;

    const cachedResponse = new Response(JSON.stringify({ data, expiryTime }), {
      headers: { "Content-Type": "application/json" },
    });

    await cache.put(url, cachedResponse);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getCachedData = async (url, cacheName = CACHE_NAME) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(url);

  if (!cachedResponse) return null;

  const cachedData = await cachedResponse.json();
  const currentTime = new Date().getTime();

  if (currentTime > cachedData.expiryTime) {
    await cache.delete(url);
    return null;
  }

  return cachedData.data;
};
