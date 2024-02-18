import React from "react";
import { useState } from "react";

const AddForm = () => {
  const [inputData, setInputData] = useState({
    name: "",
    gender: "男",
    age: "",
    address: "",
  });
  const nameChangeHandler = (e) => {
    setInputData((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, gender: e.target.value }));
  };
  const ageChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, age: e.target.value }));
  };
  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, address: e.target.value }));
  };
  const addHander = () => {
    console.log(inputData);
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
        <button onClick={addHander}>添加</button>
      </td>
    </tr>
  );
};

export default AddForm;
