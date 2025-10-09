import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Register';
import AdminRoutes from "./pages/admin/AdminRoutes";
import VendorLogin from "./pages/admin/vendorlogin";
import VendorSignup from "./pages/admin/vendorlogin";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/vendor/" element={<VendorLogin />} />
                <Route path="/vendor/" element={<VendorSignup />} />
            </Routes>
        </Router>
    );
}

export default App;