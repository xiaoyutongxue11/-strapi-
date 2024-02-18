import React from "react";
import classes from "./Student.module.css";
import { useCallback, useState } from "react";
import StuContext from "../../../store/StuContext";
import { useContext } from "react";
const Student = ({
  stu: {
    id,
    attributes: { name, gender, age, address },
  },
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stuCtx = useContext(StuContext);
  const delStu = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:1337/api/students/${id}`, {
        method: "delete",
      });
      if (!res.ok) {
        throw new Error("删除失败");
      }
      stuCtx.fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{address}</td>
        <td>
          <button onClick={delStu}>删除</button>
        </td>
      </tr>
      {loading && (
        <tr>
          <td colSpan={5}>删除中</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>{error.message}</td>
        </tr>
      )}
    </>
  );
};

export default Student;
