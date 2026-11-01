import React, { useState } from "react";

function CreatePost() {
  const [post, setPost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (post.trim() === "") {
      return;
    }

    console.log("New Post:", post);

    setPost("");
  };

  return (
    <>
      <style>
        {`
          .create-post {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .create-post textarea {
            width: 100%;
            height: 80px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            resize: none;
            box-sizing: border-box;
          }

          .create-post button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            background: #1877f2;
            color: white;
            cursor: pointer;
          }

          .create-post button:hover {
            background: #0d65d9;
          }
        `}
      </style>

      <div className="create-post">
        <h3>Create Post</h3>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What's on your mind?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />

          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;