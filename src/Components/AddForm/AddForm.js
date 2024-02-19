import React from "react";
import { useState, useCallback, useContext } from "react";
import StuContext from "../../store/StuContext";
const AddForm = () => {
  const [inputData, setInputData] = useState({
    name: "",
    gender: "男",
    age: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const stuCtx = useContext(StuContext);
  const nameChangeHandler = (e) => {
    setInputData((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, gender: e.target.value }));
  };
  const ageChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, age: +e.target.value }));
  };
  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, address: e.target.value }));
  };
  const addStudent = useCallback(async (newStudent) => {
    try {
      setLoading(true);
      setError(null);
      console.log(newStudent);
      const res = await fetch("http://localhost:1337/api/students", {
        method: "post",
        body: JSON.stringify({ data: newStudent }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("添加失败");
      }
      stuCtx.fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);
  const addStudentHandler = () => {
    addStudent(inputData);
  };
  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={nameChangeHandler}
          value={inputData.name}
        />
      </td>
      <td>
        <select onChange={genderChangeHandler} value={inputData.gender}>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </td>
      <td>
        <input
          type="number"
          onChange={ageChangeHandler}
          value={inputData.age}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={addressChangeHandler}
          value={inputData.address}
        />
      </td>
      <td>
        <button onClick={addStudentHandler}>添加</button>
      </td>
    </tr>
  );
};

export default AddForm;
