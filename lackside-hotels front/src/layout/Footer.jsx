import { Col, Row } from "react-bootstrap";

const Footer = () => {
    let date = new Date();
    return (
        <>
            <footer className="bg-dark text-light py-3 footer mt-lg-5">
                <Row>
                    <Col xs={12} md={12} className="text-center">
                        <p className="mb-0">&copy; {date.getFullYear()} lakeSide hotel</p>
                    </Col>
                </Row>
            </footer>
        </>
    )
}

export default Footer;