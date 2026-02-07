import { Card, Col, Container, Row } from "react-bootstrap";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi
} from "react-icons/fa";
import Header from "./Header";

const HotelService = () => {
  return (
    <Container className="hotel-service-section py-4">
      <Header title={"Our Services"} />

      <Row className="mb-4">
        <h4 className="text-center">
          Services at <span className="hotel-color">LakeSide Hotel</span>
          <div className="mt-2 text-muted fs-6">
            <FaClock className="me-2" />
            24-Hour Front Desk
          </div>
        </h4>
      </Row>

      <hr />

      <Row xs={1} md={2} lg={3} className="g-4 mt-3">
        <Col>
          <Card className="service-card h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaWifi className="service-icon" />
              <Card.Title className="hotel-color mt-2">Wi-Fi</Card.Title>
              <Card.Text>
                Stay connected with high-speed internet access.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaUtensils className="service-icon" />
              <Card.Title className="hotel-color mt-2">Breakfast</Card.Title>
              <Card.Text>
                Start your day with a delicious breakfast buffet.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaTshirt className="service-icon" />
              <Card.Title className="hotel-color mt-2">Laundry</Card.Title>
              <Card.Text>
                Enjoy convenient in-room laundry and cleaning services.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaCocktail className="service-icon" />
              <Card.Title className="hotel-color mt-2">Mini-Bar</Card.Title>
              <Card.Text>
                Refresh yourself with drinks and snacks from the mini-bar.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaParking className="service-icon" />
              <Card.Title className="hotel-color mt-2">Parking</Card.Title>
              <Card.Text>
                Park your car safely in our on-site parking area.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaSnowflake className="service-icon" />
              <Card.Title className="hotel-color mt-2">Air Conditioning</Card.Title>
              <Card.Text>
                Stay cool and comfortable with modern air conditioning.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <hr className="mt-5" />
    </Container>
  );
};

export default HotelService;
