import React from "react";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import StudentList from "./Components/StudentList/StudentList";
import StuContext from "./store/StuContext";
import useFetch from "./hooks/useFetch";
const App = () => {
  const { data, loading, error, fetchData } = useFetch({ url: "/students" });
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
