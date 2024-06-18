import { useEffect, useState } from "react";
import { fetchDataAndCache, getCachedData } from "../utils/cache";

// eslint-disable-next-line react/prop-types
const DataDisplay = ({ url }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = await getCachedData(url);

      if (cachedData) {
        setData(cachedData);
      } else {
        const apiData = await fetchDataAndCache(url);
        setData(apiData);
      }
    };

    fetchData();
  }, [url]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataDisplay;
