import { useEffect, useState } from "react";
import { deleteRoombyId, getAllRooms } from "../utils/apiFunction";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../common/Header";

const ExistingRoom = () => {

    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);
    const [currentpage, setCurrentPages] = useState(1);
    const [roomsperPage] = useState(8);
    const [loading, setLoading] = useState(false);
    const [filteredrooms, setFiltereedrooms] = useState([]);
    const [selectedroomtype, setSelectedRoomTypes] = useState("");
    const [successmessage, setSuccessmessage] = useState("");
    const [errormessage, setErrormessage] = useState("");

    useEffect(() => {
        const userrole = localStorage.getItem("userRole");
        console.log(userrole)
        if(userrole===null || !userrole.includes("ROLE_ADMIN")){
                setErrormessage("Restricted page!!!")
                return;
        }
        fetchRooms();
    }, []);

    const handlePaginationClick = (pagenumber) => {
        setCurrentPages(pagenumber);
    };

    const handledeleteroomById = async (roomid) => {
        try {
            const result = await deleteRoombyId(roomid);
            if (result === "") {
                setSuccessmessage("Room deleted successfully");
                fetchRooms();
            }
        } catch (e) {
            setErrormessage(e.message);
        }
    };

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setLoading(false);
        } catch (e) {
            setErrormessage(e.message);
        }
    };

    useEffect(() => {
        if (selectedroomtype === "") {
            setFiltereedrooms(rooms);
        } else {
            const filtered = rooms.filter(
                (room) => room.roomType === selectedroomtype
            );
            setFiltereedrooms(filtered);
        }
        setCurrentPages(1);
    }, [rooms, selectedroomtype]);

    const calculateTotalPages = (filteredrooms, roomsperpage, rooms) => {
        const totalrooms =
            filteredrooms.length > 0 ? filteredrooms.length : rooms.length;
        return Math.ceil(totalrooms / roomsperpage);
    };

    const indexofLastRoom = currentpage * roomsperPage;
    const indexofFirstRoom = indexofLastRoom - roomsperPage;
    const currentRooms = filteredrooms.slice(
        indexofFirstRoom,
        indexofLastRoom
    );

    return (
        <>
            {loading ? (
                <p className="text-center mt-5">Fetching rooms...</p>
            ) : (
                <section className="container my-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold">Existing Rooms</h2>

                        <Link
                            to={"/add-room"}
                            className="btn btn-primary d-flex align-items-center gap-2"
                        >
                            <FaPlus /> Add Room
                        </Link>
                    </div>

                    {successmessage && (
                        <div className="alert alert-success text-center">
                            {successmessage}
                        </div>
                    )}

                    {errormessage && (
                        <div className="alert alert-danger text-center">
                            {errormessage}
                        </div>
                    )}

                    <Row className="mb-3">
                        <Col md={6}>
                            <RoomFilter
                                data={rooms}
                                setFilteredData={setFiltereedrooms}
                            />
                        </Col>
                    </Row>

                    <div className="table-responsive admin-table">
                        <table className="table table-bordered table-hover align-middle">
                            <thead className="table-light text-center">
                                <tr>
                                    <th>ID</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.roomId} className="text-center">
                                        <td>{room.roomId}</td>
                                        <td>{room.roomType}</td>
                                        <td>${room.roomPrice}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link
                                                    to={`/edit-room/${room.roomId}`}
                                                    className="btn btn-outline-info btn-sm"
                                                >
                                                    <FaEye />
                                                </Link>

                                                <Link
                                                    to={`/edit-room/${room.roomId}`}
                                                    className="btn btn-outline-warning btn-sm"
                                                >
                                                    <FaEdit />
                                                </Link>

                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        handledeleteroomById(
                                                            room.roomId
                                                        )
                                                    }
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4">
                        <RoomPaginator
                            currentpages={currentpage}
                            totalpages={calculateTotalPages(
                                filteredrooms,
                                roomsperPage,
                                rooms
                            )}
                            onpagechange={handlePaginationClick}
                        />
                    </div>
                </section>
            )}
        </>
    );
};

export default ExistingRoom;
