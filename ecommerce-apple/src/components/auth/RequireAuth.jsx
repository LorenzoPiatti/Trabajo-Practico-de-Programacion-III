import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function RequireAuth({ children, role }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && (!user || user.role?.toLowerCase() !== role.toLowerCase())) {
        return <Navigate to="/" replace />;
    }

    return children;
}
