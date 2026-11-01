import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand" to="/">
          SocialHub
        </Link>

        {/* Hamburger button */}
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to="/explore">Explore</Link>
            <Link className="nav-link" to="/notifications">Notifications</Link>
            <Link className="nav-link" to="/profile">Profile</Link>
            <button className="btn ms-2" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2 text-white"></i>Logout</button>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;