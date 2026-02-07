import { useState } from "react";
import { cancelBooking, getBookingByConfirmationCode } from "../utils/apiFunction";

const FindBooking = () => {
    const [bookinginfo, setBookingInfo] = useState({
        bookingId: "",
        checkInDate: "",
        checkOutDate: "",
        guestfullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfchild: "",
        BookingConfirmationCode: "",
        room: { roomId: "", roomType: "" },
        totalNoOfGuest: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmationCode, setconfirmationCode] = useState("");
    const [isDelete, setisDelete] = useState(false);

    const clearBookingInfo = {
        bookingId: "",
        checkInDate: "",
        checkOutDate: "",
        guestfullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfchild: "",
        BookingConfirmationCode: "",
        room: { roomId: "", roomType: "" },
        totalNoOfGuest: ""
    };

    const handleInputChange = (e) => {
        setconfirmationCode(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await getBookingByConfirmationCode(confirmationCode);
            setBookingInfo(data);
            setError(null);
        } catch (e) {
            setBookingInfo(clearBookingInfo);
            if (e.response && e.response.status === 404) {
                setError(e.response.data.message);
            } else {
                setError(e.message);
            }
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const handleBookingCancellation = async () => {
        try {
            await cancelBooking(bookinginfo.bookingId);
            setisDelete(true);
            setBookingInfo(clearBookingInfo);
            setconfirmationCode("");
            setError("");
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="find-booking-page bg-light min-vh-100 py-5">
            <div className="container d-flex flex-column align-items-center">
                <div className="card shadow-lg p-4 find-booking-card">
                    <h2 className="text-center mb-4">Find My Booking</h2>

                    <form onSubmit={handleFormSubmit} className="mb-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter booking confirmation code"
                                value={confirmationCode}
                                onChange={handleInputChange}
                                required
                            />
                            <button className="btn btn-primary btn-hotel">
                                Find Booking
                            </button>
                        </div>
                    </form>

                    {loading && (
                        <div className="text-center my-3">
                            <div className="spinner-border text-primary" role="status"></div>
                            <p className="small mt-2">Finding booking...</p>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger text-center mt-3">
                            {error}
                        </div>
                    )}

                    {bookinginfo.BookingConfirmationCode && (
                        <div className="card mt-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="text-center mb-3">Booking Details</h5>

                                <p><strong>Confirmation Code:</strong> {bookinginfo.BookingConfirmationCode}</p>
                                <p><strong>Booking ID:</strong> {bookinginfo.bookingId}</p>
                                <p><strong>Room Number:</strong> {bookinginfo.room.roomId}</p>
                                <p><strong>Room Type:</strong> {bookinginfo.room.roomType}</p>
                                <p><strong>Check-In:</strong> {bookinginfo.checkInDate}</p>
                                <p><strong>Check-Out:</strong> {bookinginfo.checkOutDate}</p>
                                <p><strong>Guest Name:</strong> {bookinginfo.guestfullName}</p>
                                <p><strong>Email:</strong> {bookinginfo.guestEmail}</p>
                                <p><strong>Adults:</strong> {bookinginfo.numOfAdults}</p>
                                <p><strong>Children:</strong> {bookinginfo.numOfchild}</p>
                                <p><strong>Total Guests:</strong> {bookinginfo.totalNoOfGuest}</p>

                                {!isDelete && (
                                    <div className="d-grid mt-3">
                                        <button
                                            className="btn btn-danger"
                                            onClick={handleBookingCancellation}
                                        >
                                            Cancel Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isDelete && (
                        <div className="alert alert-success text-center mt-4">
                            Booking has been cancelled successfully!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindBooking;
