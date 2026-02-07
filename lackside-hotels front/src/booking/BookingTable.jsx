import { useEffect, useState } from "react";
import DateSlider from "../common/DateSlider";
import { parseISO } from "date-fns";

const BookingTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBooking, setFilteredBooking] = useState(bookingInfo);

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo;
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingstartDate = parseISO(booking.checkInDate);
                const bookingoutDate = parseISO(booking.checkOutDate);
                return (
                    bookingstartDate >= startDate &&
                    bookingoutDate <= endDate &&
                    startDate < bookingoutDate
                );
            });
        }
        setFilteredBooking(filtered);
    };

    useEffect(() => {
        setFilteredBooking(bookingInfo);
    }, [bookingInfo]);

    return (
        <section className="booking-table-section p-4">
            <div className="mb-4">
                <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>S/N</th>
                            <th>Booking ID</th>
                            <th>Room ID</th>
                            <th>Room Type</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Guest Name</th>
                            <th>Guest Email</th>
                            <th>Adults</th>
                            <th>Children</th>
                            <th>Total Guests</th>
                            <th>Confirmation Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooking.map((booking, index) => (
                            <tr key={booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.bookingId}</td>
                                <td>{booking.room.roomId}</td>
                                <td>{booking.room.roomType}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.guestfullName}</td>
                                <td>{booking.guestEmail}</td>
                                <td>{booking.numOfAdults}</td>
                                <td>{booking.numOfchild}</td>
                                <td>{booking.numOfAdults + booking.numOfchild}</td>
                                <td>{booking.BookingConfirmationCode}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleBookingCancellation(booking.bookingId)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredBooking.length === 0 && (
                <p className="text-center text-muted mt-3">
                    No bookings found for the selected dates.
                </p>
            )}
        </section>
    );
};

export default BookingTable;
