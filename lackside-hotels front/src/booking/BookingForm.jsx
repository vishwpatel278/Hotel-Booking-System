import { useEffect, useState } from "react";
import { getRoomById, saveBookings } from "../utils/apiFunction";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
    const navigate = useNavigate();

    const [isvaliated, setIsValidated] = useState(false);
    const [isSumbitted, setIsSumbitted] = useState(false);
    const [errormessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomprice] = useState(0);
    const [booking, setBooking] = useState({
        guestfullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfchild: "",
    });

    const [roominfo, setRoominfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });

    const { roomId } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const getRoomPriceByID = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomprice(response.roomPrice);
        } catch (e) {
            setErrorMessage(e.message);
        }
    };

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffinDays = checkOutDate.diff(checkInDate, "days");
        const price = roomPrice ? roomPrice : 0;
        return price * diffinDays;
    };

    const isValidGuest = () => {
        const adults = parseInt(booking.numOfAdults);
        const child = parseInt(booking.numOfchild);
        const totalguest = adults + child;
        return totalguest >= 1 && adults >= 1;
    };

    const isCheckoutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must come after check-in date");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isValidGuest() || !isCheckoutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSumbitted(true);
        }
        setIsValidated(true);
    };

    const handleBooking = async () => {
        try {
            const confirmationcode = await saveBookings(roomId, booking);
            setIsSumbitted(true);
            navigate("/booking-success", { state: { message: confirmationcode } });
        } catch (e) {
            setErrorMessage(e.message);
            navigate("/booking-success", { state: { error: errormessage } });
        }
    };

    useEffect(() => {
        getRoomPriceByID(roomId);
    }, [roomId]);

    return (
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card shadow-lg booking-card">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Reserve Room</h4>

                            <Form noValidate validated={isvaliated} onSubmit={handleSumbit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        name="guestfullName"
                                        value={booking.guestfullName}
                                        placeholder="Enter your full name"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your full name
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset className="border rounded p-3 mb-3">
                                    <legend className="float-none w-auto px-2">Lodging Period</legend>
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <Form.Label>Check-In</Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-6 mb-2">
                                            <Form.Label>Check-Out</Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    {errormessage && (
                                        <div className="text-danger small mt-1">{errormessage}</div>
                                    )}
                                </fieldset>

                                <fieldset className="border rounded p-3 mb-3">
                                    <legend className="float-none w-auto px-2">Guests</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label>Adults</Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                min={1}
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Form.Label>Children</Form.Label>
                                            <FormControl
                                                type="number"
                                                name="numOfchild"
                                                value={booking.numOfchild}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-hotel">
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    {isSumbitted && (
                        <BookingSummary
                            booking={booking}
                            payment={calculatePayment}
                            isFormValid={isvaliated}
                            isConfirm={handleBooking}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
