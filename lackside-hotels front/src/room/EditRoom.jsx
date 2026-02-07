import { Link, useParams } from "react-router-dom";
import { getRoomById, updateRoomByid } from "../utils/apiFunction";
import { useEffect, useState } from "react";

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const { roomid } = useParams();

    const [imagepreview, setImagepreview] = useState("");
    const [successmessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRoom({ ...room, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setImagepreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateRoomByid(roomid, room);
            if (response.status === 200) {
                setSuccessMessage("Room updated successfully");
                const updatedRoomData = await getRoomById(roomid);
                setRoom(updatedRoomData);
                setImagepreview(updatedRoomData.photo);
                setErrorMessage("");
            } else {
                setErrorMessage("Error updating room");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomid);
                setRoom(roomData);
                setImagepreview(roomData.photo);
            } catch (e) {
                console.error(e);
            }
        };
        fetchRoom();
    }, [roomid]);

    return (
        <section className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg p-4 edit-room-card">
                        <h2 className="text-center mb-4">
                            Edit Existing Room
                        </h2>

                        {successmessage && (
                            <div className="alert alert-success text-center">
                                {successmessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="alert alert-danger text-center">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">
                                    Room Type
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="roomType"
                                    value={room.roomType}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Room Price
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="roomPrice"
                                    value={room.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Room Photo
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    name="photo"
                                    onChange={handleImageChange}
                                />

                                {imagepreview && (
                                    <div className="text-center mt-3">
                                        <img
                                            src={`data:image/jpeg;base64,${imagepreview}`}
                                            alt="Room Preview"
                                            className="img-thumbnail room-preview"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="d-flex justify-content-between mt-4">
                                <Link
                                    to={"/existing-rooms"}
                                    className="btn btn-outline-secondary"
                                >
                                    Back
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary"
                                >
                                    Update Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditRoom;
