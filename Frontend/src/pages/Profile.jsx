
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();

    const [selectedPost, setSelectedPost] = useState(null);

    const loggedInUser = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const id = loggedInUser?.id;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Posts");
    const [following, setFollowing] = useState(false);

    // Fetch user details
    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        fetch(`http://localhost:3000/users/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.log(error);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    // Close popup using Escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedPost(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading profile...</p>
            </div>
        );
    }

    if (!loggedInUser) {
        return (
            <div className="text-center mt-5">
                <h3>Please login first</h3>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/")}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center mt-5">
                <h3>User profile not found</h3>
            </div>
        );
    }

    // Dynamic profile information
    const profileImage = user.profileImage || user.avatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300";

    const coverImage = user.coverImage ||
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400";

    const posts = user.posts || [];

    return (
        <div className="profile-page">

            <Navbar />

            <div className="container profile-container">

                {/* Cover Image */}
                <div
                    className="profile-cover"
                    style={{ backgroundImage: `url(${coverImage})` }}
                >
                    <button className="btn btn-light cover-button">
                        <i className="bi bi-camera-fill me-2"></i>
                        Edit Cover
                    </button>
                </div>

                {/* Profile Main Section */}
                <div className="profile-main">

                    <div className="profile-heading">

                        <img
                            src={profileImage}
                            alt="Profile"
                            className="profile-image"
                        />

                        <div className="profile-buttons">
                            <button className="btn btn-outline-primary">
                                <i className="bi bi-pencil-square me-2"></i>
                                Edit Profile
                            </button>

                            <button className="btn btn-primary">
                                <i className="bi bi-share me-2"></i>
                                Share Profile
                            </button>
                        </div>

                    </div>

                    {/* User Details */}
                    <div className="profile-details">

                        <h2>{user.name}</h2>

                        <p className="profile-username">
                            @{user.username || user.email?.split("@")[0] || user.id}
                        </p>

                        <p className="profile-bio">
                            {user.bio || "Welcome to my profile! ✨"}
                        </p>

                        <div className="profile-extra">

                            {user.location && (
                                <span>
                                    <i className="bi bi-geo-alt"></i>
                                    {user.location}
                                </span>
                            )}

                            {user.website && (
                                <span>
                                    <i className="bi bi-link-45deg"></i>
                                    {user.website}
                                </span>
                            )}

                            <span>
                                <i className="bi bi-calendar3"></i>
                                Member since 2026
                            </span>

                        </div>

                        {/* Statistics */}
                        <div className="profile-stats">

                            <div>
                                <strong>{user.postsCount ?? posts.length}</strong>
                                <span>Posts</span>
                            </div>

                            <div>
                                <strong>{user.followers ?? 0}</strong>
                                <span>Followers</span>
                            </div>

                            <div>
                                <strong>{user.following ?? 0}</strong>
                                <span>Following</span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Tabs */}
                <div className="profile-tabs">

                    {["Posts", "Saved", "Tagged"].map((tab) => (

                        <button
                            key={tab}
                            className={activeTab === tab ? "active" : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "Posts" && (
                                <i className="bi bi-grid-3x3-gap me-2"></i>
                            )}

                            {tab === "Saved" && (
                                <i className="bi bi-bookmark me-2"></i>
                            )}

                            {tab === "Tagged" && (
                                <i className="bi bi-person-square me-2"></i>
                            )}

                            {tab}
                        </button>

                    ))}

                </div>

                {/* Tab Content */}
                <div className="profile-posts">

                    {activeTab === "Posts" ? (

                        <>
                            <h3>Posts</h3>

                            <div className="post-grid">

                                {posts.length > 0 ? (

                                    posts.map((post) => (

                                        <div
                                            key={post.id}
                                            className="post-item"
                                            onClick={() => setSelectedPost(post)}
                                        >
                                            <img
                                                src={post.image}
                                                alt={post.caption || "User post"}
                                            />
                                        </div>

                                    ))

                                ) : (
                                    <p>No posts yet.</p>
                                )}

                            </div>
                        </>

                    ) : (

                        <div className="empty-profile">
                            <i className="bi bi-images"></i>
                            <h4>{activeTab}</h4>
                            <p>Nothing to display yet.</p>
                        </div>

                    )}

                </div>

            </div>

            {/* Expanded Post Popup */}
            {selectedPost && (

                <div
                    className="post-modal-overlay"
                    onClick={() => setSelectedPost(null)}
                >

                    <div
                        className="post-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className="post-modal-close"
                            onClick={() => setSelectedPost(null)}
                        >
                            &times;
                        </button>

                        <img
                            src={selectedPost.image}
                            alt={selectedPost.caption || "Selected post"}
                            className="post-modal-image"
                        />

                        <div className="post-modal-caption">

                            <div className="modal-user-info">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                />

                                <div>
                                    <h5>{user.name}</h5>
                                    <span>@{user.username}</span>
                                </div>
                            </div>

                            <p>{selectedPost.caption}</p>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Profile;
