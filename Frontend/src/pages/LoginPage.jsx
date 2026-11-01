import './LoginPage.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {

    // Login Account states
    const [showPassword, setShowPassword] = useState(false);
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [message, setMessage] = useState("hi");
    const [activeTab, setActiveTab] = useState("login");
    const navigate = useNavigate();
    
    // Create Account states
    const [registerName, setRegisterName] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const [registerError, setRegisterError] = useState(false);

    // Handle login form submission
    async function handLogin(e)
    {
        e.preventDefault();
        setMessage("");
        try{
            const response=await fetch("http://localhost:3000/users");
            if(!response.ok)
            {
                throw new Error("Failed to fetch user data");
            }
            const users=await response.json();
            const user=users.find((u) => (u.email === loginName || u.username === loginName)&& u.password === loginPassword);
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/home");
        }
            else
            {
                setMessage("");
            }
            console.log(message);
        }
        catch(error)
        {
            setMessage("Error occurred while fetching user data");
        }
    }

    // Handle register form submission
    async function handleRegister(e) {
    e.preventDefault();

    setRegisterMessage("");
    setRegisterError(false);

    // Check whether passwords match
    if (registerPassword !== registerRepeatPassword) {
        setRegisterMessage("Passwords do not match");
        setRegisterError(true);
        return;
    }

    try {
        // Get existing users
        const response = await fetch("http://localhost:3000/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        // Check duplicate email or username
        const existingUser = users.find(
            (user) =>
                user.email.toLowerCase() === registerEmail.trim().toLowerCase() ||
                user.username.toLowerCase() === registerUsername.trim().toLowerCase()
        );

        if (existingUser) {
            setRegisterMessage("Email or username already exists");
            setRegisterError(true);
            return;
        }

        // Create new user
        const newUser = {
            name: registerName.trim(),
            username: registerUsername.trim(),
            email: registerEmail.trim(),
            password: registerPassword,
            bio: "",
            profileImage: "https://i.pravatar.cc/150",
            coverImage: "",
            location: "",
            website: "",
            postsCount: 0,
            followers: 0,
            following: 0,
            posts: []
        };

        // Send user details to JSON Server
        const createResponse = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        if (!createResponse.ok) {
            throw new Error("Account creation failed");
        }

        setRegisterMessage("Account created successfully! You can now login.");

        // Clear registration fields
        setRegisterName("");
        setRegisterUsername("");
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterRepeatPassword("");

    } catch (error) {
        setRegisterMessage("Something went wrong. Please try again.");
        setRegisterError(true);
        console.error(error);
    }
}

    return (
        
        <div className="container rounded border-dark my-3 py-3" style={{ borderRadius:"5px",maxWidth: "550px" }}>
            {/* Login and Register tabs */}
            <ul className="nav nav-pills nav-justified mb-4">
                <li className="nav-item">
                    <button
                        type="button"
                        className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        type="button"
                        className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                        onClick={() => setActiveTab("register")}
                    >
                        Register
                    </button>
                </li>
            </ul>

            {/* Login form */}
            {activeTab === "login" && (
                <form onSubmit={handLogin}>
                    <h3 className="text-center mb-4">Welcome Back</h3>

                    <p className="text-center text-muted mb-4">
                        Sign in to your account
                    </p>

                    <div className="mb-3">
                        <label htmlFor="loginName" className="form-label">
                            Email or username
                        </label>
                        <input
                            value={loginName}
                            onChange={(e) => {setLoginName(e.target.value); }}
                            type="text"
                            id="loginName"
                            className="form-control"
                            placeholder="Enter email or username"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">
                            Password
                        </label>
                        <div>
                            <input
                                value={loginPassword}
                                onChange={(e) => {
                                    setLoginPassword(e.target.value);
                                }}
                                type={showPassword ? "text" : "password"}
                                id="loginPassword"
                                className="form-control"
                                placeholder="Enter password"
                                required
                            />

                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={(e) => setShowPassword(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="showPassword">
                                    Show password
                                </label>
                                {!message && <p style={{ color: "red" }}>Password do not match</p>}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="loginCheck"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="loginCheck">
                                Remember me
                            </label>
                        </div>

                        <a href="#forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Sign in
                    </button>

                    <p className="text-center">
                        Not a member?{" "}
                        <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() => setActiveTab("register")}
                        >
                            Register
                        </button>
                    </p>
                </form>
            )}

            {/* Register form */}
            {activeTab === "register" && (
                <form onSubmit={handleRegister}>
                    <h3 className="text-center mb-4">Create Account</h3>

                    <div className="mb-3">
                        <label htmlFor="registerName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="registerName"
                            className="form-control"
                            placeholder="Enter your name"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="registerUsername" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="registerUsername"
                            className="form-control"
                            placeholder="Choose a username"
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="registerEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="registerEmail"
                            className="form-control"
                            placeholder="Enter your email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="registerPassword" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="registerPassword"
                            className="form-control"
                            placeholder="Create a password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="registerRepeatPassword" className="form-label">
                            Repeat password
                        </label>
                        <input
                            type="password"
                            id="registerRepeatPassword"
                            className="form-control"
                            placeholder="Repeat your password"
                            value={registerRepeatPassword}
                            onChange={(e) => setRegisterRepeatPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-check mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="registerCheck"
                            required
                        />
                        <label className="form-check-label" htmlFor="registerCheck">
                            I agree to the terms and conditions
                        </label>
                    </div>

                    {registerMessage && (
                        <p className={registerError ? "text-danger" : "text-success"}>
                            {registerMessage}
                        </p>
                    )}

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Create Account
                    </button>

                    <p className="text-center">
                        Already a member?{" "}
                        <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() => setActiveTab("login")}
                        >
                            Login
                        </button>
                    </p>
                </form>
            )}
        </div>
    );
};

export default LoginPage;
