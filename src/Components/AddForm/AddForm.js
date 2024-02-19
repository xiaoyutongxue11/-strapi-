import React from "react";
import { useState, useCallback, useContext } from "react";
import StuContext from "../../store/StuContext";
import useFetch from "../../hooks/useFetch";
const AddForm = (props) => {
  const student = props.stu
    ? props.stu
    : { name: "", gender: "男", age: "", address: "" };
  const [inputData, setInputData] = useState(student);
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
  const {
    loading,
    error,
    fetchData: updataStudent,
  } = useFetch(
    {
      url: props.stuId ? `/students/${props.stuId}` : "/students",
      method: props.stu ? "put" : "post",
    },
    stuCtx.fetchData
  );
  const addStudentHandler = () => {
    updataStudent(inputData);
  };
  const editStudentHandler = () => {
    updataStudent(inputData);
  };
  return (
    <>
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
          {props.stu ? (
            <>
              <button onClick={props.onCancel}>取消</button>
              <button onClick={editStudentHandler}>确认</button>
            </>
          ) : (
            <button onClick={addStudentHandler}>添加</button>
          )}
        </td>
      </tr>
      {loading && (
        <tr>
          <td colSpan={5}>{props.stu ? "正在修改" : "正在添加"}</td>
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

export default AddForm;
