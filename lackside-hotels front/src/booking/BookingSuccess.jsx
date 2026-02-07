import { useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
    const location = useLocation();
    const message = location.state?.message;
    const error = location.state?.error;

    return (
        <div className="booking-success-page">
            <Header title={"Booking Status"} />

            <div className="container d-flex justify-content-center align-items-center">
                <div className="card shadow-lg p-4 text-center booking-status-card mt-5">
                    {message ? (
                        <>
                            <h3 className="text-success mb-3">🎉 Booking Successful!</h3>
                            <p className="text-success fw-semibold">{message}</p>
                        </>
                    ) : (
                        <>
                            <h3 className="text-danger mb-3">❌ Booking Failed</h3>
                            <p className="text-danger">
                                Sorry, the room is not available for the selected dates.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
