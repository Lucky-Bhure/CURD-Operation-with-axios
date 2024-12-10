import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import { deleteApiData, getApiData } from "../../api/PostApi";
import Form from "../Form/Form";

const PostPage = () => {
  const [data, setData] = useState([]);
  const [editElement, setEditElement] = useState({});

  const getData = async() => {
    try {
      const res = await getApiData();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async(id) => {
    try {
      const res = await deleteApiData(id);
      if (res.status == 200) {
        const updatedData = data.filter((currEle) => currEle.id !== id)
        setData(updatedData);
      } else {
        console.log(`Unable to delete post with ID: ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-page">
      <Form
        data={data}
        setData={setData}
        editElement={editElement}
        setEditElement={setEditElement}
      />
      <div className="main-app-container">
        <ul className="post-container">
          {
            data.map((currEle, index) => 
            <PostCard
            index={index}
            data={currEle}
            handleDelete={handleDelete}
            setEditElement={setEditElement}
            key={currEle.id}
            />)
          }
        </ul>
      </div>
    </div>
  );
};

export default PostPage;
