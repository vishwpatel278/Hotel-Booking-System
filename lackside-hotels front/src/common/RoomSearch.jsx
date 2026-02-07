import moment from "moment";
import { useState } from "react";
import { getAvailableRooms } from "../utils/apiFunction";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomSearchResult from "./RoomSearchResult";

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [availableRoom, setAvailabelRoom] = useState([]);
    const [isloading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const checkIn = moment(searchQuery.checkInDate);
        const checkOut = moment(searchQuery.checkOutDate);
        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMsg("please enter valid date range");
            return;
        }
        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMsg("check-In Date must come before check-out Date");
            return;
        }
        setIsLoading(true);
        getAvailableRooms(
            searchQuery.checkInDate,
            searchQuery.checkOutDate,
            searchQuery.roomType
        )
            .then((response) => {
                setAvailabelRoom(response.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            })
            .catch(() => {
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const checkIn = moment(searchQuery.checkInDate);
        const checkOut = moment(searchQuery.checkOutDate);
        setSearchQuery((prev) => ({
            ...prev,
            [name]: value
        }));
        if (checkIn.isValid() && checkOut.isValid()) {
            setErrorMsg("");
        }
    };

    const clearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        });
    };

    return (
        <Container className="room-search-container my-5 p-4 shadow-sm">
            <h3 className="text-center mb-4">Search Available Rooms</h3>

            <Form onSubmit={handleSearch}>
                <Row className="g-3 justify-content-center">
                    <Col xs={12} md={3}>
                        <Form.Group controlId="checkInDate">
                            <Form.Label>Check-in Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkInDate"
                                value={searchQuery.checkInDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group controlId="checkOutDate">
                            <Form.Label>Check-out Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="checkOutDate"
                                value={searchQuery.checkOutDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3}>
                        <Form.Group>
                            <Form.Label>Room Type</Form.Label>
                            <div className="d-flex gap-2">
                                <RoomTypeSelector
                                    handleRoomInputChange={handleInputChange}
                                    newRoom={searchQuery}
                                />
                                <Button variant="primary" type="submit">
                                    Search
                                </Button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            {isloading && (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Finding available rooms...</p>
                </div>
            )}

            {!isloading && availableRoom && (
                <RoomSearchResult
                    results={availableRoom}
                    onClearSearch={clearSearch}
                />
            )}

            {errorMsg && (
                <p className="text-danger text-center mt-3">{errorMsg}</p>
            )}
        </Container>
    );
};

export default RoomSearch;
