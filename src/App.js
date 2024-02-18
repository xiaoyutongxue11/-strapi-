import React from "react";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import StudentList from "./Components/StudentList/StudentList";
import StuContext from "./store/StuContext";
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:1337/api/students");
      if (res.ok) {
        const data = await res.json();
        setData(data.data);
      } else {
        throw new Error("数据加载异常");
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <StuContext.Provider value={{ fetchData }}>
      <div>
        {!loading && !error && <StudentList stus={data} />}
        {loading && <p>数据正在加载中......</p>}
        {error && <p>{error.message}</p>}
        <button onClick={fetchData}>刷新</button>
      </div>
    </StuContext.Provider>
  );
};

export default App;
