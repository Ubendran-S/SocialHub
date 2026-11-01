import React, { useState } from "react";

function Comment({ username, text }) {
  const [likes, setLikes] = useState(0);

  return (
    <>
      <style>
        {`
          .comment {
            display: flex;
            gap: 10px;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }

          .comment-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }

          .comment-content {
            flex: 1;
          }

          .comment-content h4 {
            margin: 0 0 5px;
          }

          .comment-content p {
            margin: 0 0 5px;
          }

          .comment-content button {
            border: none;
            background: none;
            cursor: pointer;
            color: #555;
          }
        `}
      </style>

      <div className="comment">
        <div className="comment-avatar">
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="comment-content">
          <h4>{username}</h4>
          <p>{text}</p>

          <button onClick={() => setLikes(likes + 1)}>
            Like {likes > 0 && `(${likes})`}
          </button>
        </div>
      </div>
    </>
  );
}

export default Comment;