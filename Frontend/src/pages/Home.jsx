
import React from "react";
import PostCard from "../Components/Postcard";
import { useEffect } from "react";
import "./Home.css";
import Navbar from "../Components/Navbar";
function Home() {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(async () => {
          resolve(await fetch("http://localhost:3000/posts"));
        }, 500);
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="post-list">
          {posts.map((post) => (
            <PostCard id={post.id} user={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
