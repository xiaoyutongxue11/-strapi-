import { useState, useCallback } from "react";
export default function useFetch(req, cb) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const fetchData = async (body) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:1337/api${req.url}`, {
        method: req.method || "get",
        body: body ? JSON.stringify({ data: body }) : null,
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
        cb && cb();
      } else {
        throw new Error("数据加载异常");
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fetchData };
}
