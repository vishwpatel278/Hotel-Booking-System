import { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/apiFunction";
import Header from "../common/Header";
import BookingTable from "./BookingTable";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userrole = localStorage.getItem("userRole");
        if(userrole===null || !userrole.includes("ROLE_ADMIN")){
            navigate("/login")
            return;
        }
    })
    const [bookinginfo, setBookingInfo] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            getAllBookings()
                .then((data) => {
                    setBookingInfo(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        }, 1000);
    }, []);

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            const data = await getAllBookings();
            setBookingInfo(data);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <section className="bookings-page">
            <div className="container py-5">
                <Header title={"Existing Bookings"} />

                {error && (
                    <div className="alert alert-danger text-center mt-3">
                        {error}
                    </div>
                )}

                {isloading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2">Loading bookings...</p>
                    </div>
                ) : (
                    <div className="card shadow-sm p-3 mt-4">
                        <BookingTable
                            bookingInfo={bookinginfo}
                            handleBookingCancellation={handleBookingCancellation}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Bookings;