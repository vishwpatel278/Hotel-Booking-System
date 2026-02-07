import { useEffect, useState } from "react";
import { addRoom } from "../utils/apiFunction";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link, useNavigate } from "react-router-dom";

const AddRoom = () => {
    const naviagate = useNavigate();
    useEffect(() => {
        const userrole = localStorage.getItem("userRole");
        if(userrole===null || !userrole.includes("ROLE_ADMIN")){
            naviagate("/login")
            return;
        }
    })
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const [imagepreview, setImagepreview] = useState("");
    const [successmessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        setNewRoom({ ...newRoom, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });
        setImagepreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addRoom(
                newRoom.photo,
                newRoom.roomType,
                newRoom.roomPrice
            );
            if (success !== undefined) {
                setSuccessMessage("A new room added successfully");
                setNewRoom({ photo: null, roomPrice: "", roomType: "" });
                setImagepreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding room");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <section className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg p-4 add-room-card">
                        <h2 className="text-center mb-4">Add a New Room</h2>

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
                                <label className="form-label">Room Type</label>
                                <RoomTypeSelector
                                    handleRoomInputChange={handleRoomInputChange}
                                    newRoom={newRoom}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">
                                    Room Price
                                </label>
                                <input
                                    className="form-control"
                                    required
                                    type="number"
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Room Photo
                                </label>
                                <input
                                    className="form-control"
                                    required
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    onChange={handleImageChange}
                                />

                                {imagepreview && (
                                    <div className="text-center mt-3">
                                        <img
                                            src={imagepreview}
                                            alt="Preview Room"
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
                                    Save Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddRoom;
