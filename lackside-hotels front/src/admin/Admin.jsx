import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userrole = localStorage.getItem("userRole");
        if(userrole===null || !userrole.includes("ROLE_ADMIN")){
            navigate("/login");
            return;
        }
    })

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-5 admin-card text-center">
                <h1 className="mb-4">Welcome to Admin Panel</h1>

                <div className="d-grid gap-3">
                    <Link to={"/existing-rooms"} className="btn btn-primary">
                        Manage Rooms
                    </Link>

                    <Link to={"/existing-bookings"} className="btn btn-outline-primary">
                        Manage Bookings
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Admin;
