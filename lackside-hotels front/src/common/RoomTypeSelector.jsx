import { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/apiFunction";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomtype, setRoomType] = useState([""]);
    const [showroomtypeInput, setshowRoomTypeInput] = useState(false);
    const [newRoomType, setnewRoomType] = useState("");

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomType(data);
        });
    }, []);

    const handlenewRoomInputChange = (e) => {
        setnewRoomType(e.target.value);
    };

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomType([...roomtype, newRoomType]);
            setnewRoomType("");
            setshowRoomTypeInput(false);
        }
    };

    return (
        <div className="room-type-selector">
            <select
                className="form-select"
                name="roomType"
                id="roomType"
                value={newRoom.roomType}
                onChange={(e) => {
                    if (e.target.value === "Add New") {
                        setshowRoomTypeInput(true);
                    } else {
                        handleRoomInputChange(e);
                    }
                }}
            >
                <option value={""}>Select a room type</option>
                <option value={"Add New"}>Add New</option>

                {roomtype.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {showroomtypeInput && (
                <div className="input-group mt-2">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter new room type"
                        onChange={handlenewRoomInputChange}
                    />
                    <button
                        className="btn btn-primary btn-hotel"
                        type="button"
                        onClick={handleAddNewRoomType}
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
};

export default RoomTypeSelector;
