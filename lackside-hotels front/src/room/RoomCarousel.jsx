import { useEffect, useState } from "react";
import { getAllRooms } from "../utils/apiFunction";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        getAllRooms()
            .then((data) => {
                setRooms(data);
                setLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary mb-2" />
                <p>Fetching rooms...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center my-5">
                Error: {error}
            </div>
        );
    }

    return (
        <section className="room-carousel-section py-5 mb-5">
            <Container>
                <div className="text-center mb-4">
                    <Link
                        className="hotel-color fw-bold fs-4 text-decoration-none"
                        to={"/browse-all-rooms"}
                    >
                        Browse All Rooms
                    </Link>
                </div>

                <Carousel indicators={false} interval={4000}>
                    {[...Array(Math.ceil(rooms.length / 4))].map(
                        (_, index) => (
                            <Carousel.Item key={index}>
                                <Row className="g-4">
                                    {rooms
                                        .slice(index * 4, index * 4 + 4)
                                        .map((room) => (
                                            <Col
                                                key={room.roomId}
                                                xs={12}
                                                md={6}
                                                lg={3}
                                            >
                                                <Card className="carousel-room-card h-100 shadow-sm">
                                                    <Link
                                                        to={`/book-room/${room.roomId}`}
                                                    >
                                                        <Card.Img
                                                            src={`data:image/png;base64,${room.photo}`}
                                                            alt="Room"
                                                            className="carousel-room-image"
                                                        />
                                                    </Link>

                                                    <Card.Body className="text-center">
                                                        <Card.Title className="hotel-color fw-bold">
                                                            {room.roomType}
                                                        </Card.Title>

                                                        <Card.Text className="room-price">
                                                            ₹{room.roomPrice} / night
                                                        </Card.Text>

                                                        <Link
                                                            to={`/book-room/${room.roomId}`}
                                                            className="btn btn-hotel btn-sm mt-2 btn-book-now"
                                                        >
                                                            View / Book
                                                        </Link>

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                </Row>
                            </Carousel.Item>
                        )
                    )}
                </Carousel>
            </Container>
        </section>
    );
};

export default RoomCarousel;
