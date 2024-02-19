import React from "react";
import classes from "./Student.module.css";
import { useCallback, useState } from "react";
import StuContext from "../../../store/StuContext";
import { useContext } from "react";
import AddForm from "../../AddForm/AddForm";
import useFetch from "../../../hooks/useFetch";
const Student = ({ stu: { id, attributes } }) => {
  const { name, gender, age, address } = attributes;
  const [isEdit, setIsEdit] = useState(false);
  const stuCtx = useContext(StuContext);
  const {
    loading,
    error,
    fetchData: delStudent,
  } = useFetch({ url: `/students/${id}`, method: "delete" }, stuCtx.fetchData);
  const delStuHandler = () => {
    delStudent();
  };
  const cancelEdit = () => {
    setIsEdit(false);
  };
  return (
    <>
      {!isEdit && (
        <tr>
          <td>{name}</td>
          <td>{gender}</td>
          <td>{age}</td>
          <td>{address}</td>
          <td>
            <button onClick={delStuHandler}>删除</button>
            <button onClick={() => setIsEdit(true)}>修改</button>
          </td>
        </tr>
      )}
      {isEdit && <AddForm stuId={id} stu={attributes} onCancel={cancelEdit} />}
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
