import React from "react";
import "./PostCard.css";

const PostCard = ({ index ,data, handleDelete, setEditElement }) => {
  const { userId, id, title, body } = data;

  const handleEdit = () => {
    setEditElement(data);
  };

  return (
    <li className="post-main-container" key={id}>
      <p>{index+1}</p>
      <p>
        <span>Title:</span> {title}
      </p>
      <p>
        <span>News:</span> {body}
      </p>
      <div className="btn-container">
        <button className="edit" onClick={handleEdit}>
          EDIT
        </button>
        <button className="delete" onClick={() => handleDelete(id)}>
          DELETE
        </button>
      </div>
    </li>
  );
};

export default PostCard;
