import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const BookingSummary = ({ booking, payment, isFormValid, isConfirm }) => {
    const amount = payment();
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numofDays = checkOutDate.diff(checkInDate, "days");
    const [isBookingConfirmed, setIsbookingConfirmed] = useState(false);
    const [isProcessingPayment, setisProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setisProcessingPayment(true);
        setTimeout(() => {
            setIsbookingConfirmed(true);
            setisProcessingPayment(false);
            isConfirm();
        }, 3000);
    };

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success");
        }
    }, [isBookingConfirmed, navigate]);

    return (
        <div className="card shadow-lg booking-summary-card mt-5">
            <div className="card-body">
                <h4 className="text-center mb-4">Reservation Summary</h4>

                <div className="summary-item">
                    <span>Full Name</span>
                    <strong>{booking.guestfullName}</strong>
                </div>

                <div className="summary-item">
                    <span>Email</span>
                    <strong>{booking.guestEmail}</strong>
                </div>

                <div className="summary-item">
                    <span>Check-In</span>
                    <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
                </div>

                <div className="summary-item">
                    <span>Check-Out</span>
                    <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
                </div>

                <div className="summary-item">
                    <span>Number of Days</span>
                    <strong>{numofDays}</strong>
                </div>

                <hr />

                <h6 className="mb-2">Guests</h6>
                <p className="mb-1">
                    <strong>Adults:</strong> {booking.numOfAdults}
                </p>
                <p>
                    <strong>Children:</strong> {booking.numOfchild}
                </p>

                <hr />

                {amount > 0 ? (
                    <>
                        <div className="text-center mb-3">
                            <h5 className="text-primary">
                                Total Payment: <strong>${amount}</strong>
                            </h5>
                        </div>

                        {isFormValid && !isBookingConfirmed ? (
                            <div className="d-grid">
                                <Button variant="success" onClick={handleConfirmBooking}>
                                    {isProcessingPayment ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Processing payment...
                                        </>
                                    ) : (
                                        "Confirm Booking & Proceed to Payment"
                                    )}
                                </Button>
                            </div>
                        ) : isBookingConfirmed ? (
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading</span>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p className="text-danger text-center mt-3">
                        Check-out date must be after check-in date
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookingSummary;
