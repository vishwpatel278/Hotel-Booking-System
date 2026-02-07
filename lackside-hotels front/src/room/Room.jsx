import { useEffect, useState } from "react";
import { getAllRooms } from "../utils/apiFunction";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

const Room = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [filtereddata, setFilteredData] = useState([]);
    const [currentpage, setCurrentPage] = useState(1);
    const [roomsperpage] = useState(6);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllRooms()
            .then((data) => {
                setData(data);
                setFilteredData(data);
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
                {error}
            </div>
        );
    }

    const handlePageChange = (pagenumber) => {
        setCurrentPage(pagenumber);
    };

    const totalpages = Math.ceil(filtereddata.length / roomsperpage);

    const renderRooms = () => {
        const startIndex = (currentpage - 1) * roomsperpage;
        const endIndex = startIndex + roomsperpage;
        return filtereddata
            .slice(startIndex, endIndex)
            .map((room) => (
                <RoomCard key={room.roomId} room={room} />
            ));
    };

    return (
        <Container className="my-5">
            <Row className="align-items-center mb-4">
                <Col md={6}>
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>

                <Col md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
                    <RoomPaginator
                        currentpages={currentpage}
                        totalpages={totalpages}
                        onpagechange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row className="g-4">
                {renderRooms()}
            </Row>

            {totalpages > 1 && (
                <Row className="mt-5">
                    <Col className="d-flex justify-content-center">
                        <RoomPaginator
                            currentpages={currentpage}
                            totalpages={totalpages}
                            onpagechange={handlePageChange}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Room;
