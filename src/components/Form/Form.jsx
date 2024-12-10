import React, { useEffect, useState } from "react";
import "./Form.css";
import { postApiData, updateApiData } from "../../api/PostApi";

const Form = ({ data, setData, editElement, setEditElement }) => {
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(editElement).length === 0;

  useEffect(() => {
    editElement &&
      setInputData({
        title: editElement.title || "",
        body: editElement.body || "",
      });
  }, [editElement]);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addPostData = async () => {
    try {
      const res = await postApiData(inputData);
      if (res.status == 201) {
        setData([...data, res.data]);
        setInputData({
          title: "",
          body: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const value = event.nativeEvent.submitter.value;
    if (value === "Add") {
      addPostData();
    } else if (value === "Edit") {
      updatePostData();
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateApiData(editElement.id, inputData);

      if (res.status == 200) {
        setData((prev) => prev.map((currEle) => currEle.id === res.data.id ? res.data : currEle));
        setEditElement({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="form-container">
      <input
        type="text"
        name="title"
        value={inputData.title}
        onChange={handleInputChange}
        placeholder="Add Title..."
        required
      />
      <input
        type="text"
        name="body"
        value={inputData.body}
        onChange={handleInputChange}
        placeholder="Add Post..."
        required
      />
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
