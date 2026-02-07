import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
    return (
        <Col key={room.roomId} className="mb-4" xs={12}>
            <Card className="room-card shadow-sm h-100">
                <Card.Body className="d-flex flex-column flex-md-row align-items-center gap-4">

                    {/* Room Image */}
                    <div className="room-image-wrapper">
                        <Link to={`/book-room/${room.roomId}`}>
                            <Card.Img
                                src={`data:image/png;base64,${room.photo}`}
                                alt="Room"
                                className="room-image"
                            />
                        </Link>
                    </div>

                    {/* Room Info */}
                    <div className="flex-grow-1 text-center text-md-start">
                        <Card.Title className="hotel-color fw-bold fs-4">
                            {room.roomType}
                        </Card.Title>

                        <Card.Text className="room-price fw-semibold">
                            ₹{room.roomPrice} / night
                        </Card.Text>

                        <Card.Text className="text-muted">
                            Comfortable, well-furnished room with modern amenities
                            for a relaxing stay.
                        </Card.Text>
                    </div>

                    {/* Action */}
                    <div className="text-center">
                        <Link
                            to={`/book-room/${room.roomId}`}
                            className="btn-book-mini"
                        >
                            Book
                        </Link>

                    </div>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default RoomCard;
