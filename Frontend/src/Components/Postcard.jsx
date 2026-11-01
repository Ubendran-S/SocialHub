import React, { useState } from "react";
import { useEffect } from "react";

function PostCard({ id,user }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
  setTimeout(() => {
    fetch("http://localhost:3000/users/" + id)
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
    }, 1000);
  }, [id]);
  const handleLike = () => {
    setLiked(!liked);
  };
  console.log("PostCard rendered for user:", currentUser?.name);
  if(currentUser === undefined) {
    return <div>Loading...</div>;
  }
if(!user) return(<p>Loading....</p>);
  return (
    <div className="instagram-user w-100 my-4 mx-auto px-3 border border-2 border-black rounded-3 text-dark bg-white">
      {/* Header */}
      <div className="post-header">
        <div className="user-info">
          <img
            src={currentUser?.profileImage}
            alt={currentUser?.name}
            className="profile-image"
          />
          <div>
            <h4>{currentUser?.name}</h4>
            <span>@{currentUser?.username}</span>
          </div>
        </div>
        <button className="more-btn">
          •••
        </button>
      </div>

      {/* Post Image */}
      {user.image && (
        <div className="post-image-container">
          <img
            src={user.image}
            alt="Post"
            className="post-image"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="post-actions">

        <div className="left-actions">

          <button onClick={handleLike}>
            {liked ? "❤️" : "♡"}
          </button>

          <button>
            💬
          </button>

          <button>
            ↗
          </button>

        </div>

        <button>
          🔖
        </button>

      </div>

      {/* Likes */}
      <div className="likes">
        <strong>
          {user.likes + (liked ? 1 : 0)} likes
        </strong>
      </div>

      {/* Caption */}
      <div className="caption">
        <strong>{currentUser?.username}</strong>{" "}
        {user.caption}
      </div>

      {/* Comments */}
      {user.comments > 0 && (
        <div className="view-comments">
          View all {user.comments} comments
        </div>
      )}

      {/* Add Comment */}
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
        />

        <button>
          Post
        </button>
      </div>

    </div>
    
  );
}

export default PostCard;