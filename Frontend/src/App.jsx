import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import LoginPage from "./pages/LoginPage";
import Notifications from "./pages/Notifications";
function App() {
    return (
        <BrowserRouter>
            {/* <Navbar/> */}
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;