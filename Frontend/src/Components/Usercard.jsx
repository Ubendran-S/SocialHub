import React from "react";

function UserCard({ username, name, followers }) {
  return (
    <>
      <style>
        {`
          .user-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            width: 220px;
          }

          .user-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #ddd;
            margin: 0 auto 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            font-weight: bold;
          }

          .user-card h3 {
            margin: 5px 0;
          }

          .user-card p {
            color: #666;
          }

          .follow-button {
            padding: 8px 20px;
            border: none;
            border-radius: 6px;
            background: #1877f2;
            color: white;
            cursor: pointer;
          }

          .follow-button:hover {
            background: #0d65d9;
          }
        `}
      </style>

      <div className="user-card">
        <div className="user-avatar">
          {username.charAt(0).toUpperCase()}
        </div>

        <h3>{name}</h3>
        <p>@{username}</p>
        <p>{followers} Followers</p>

        <button className="follow-button">
          Follow
        </button>
      </div>
    </>
  );
}

export default UserCard;