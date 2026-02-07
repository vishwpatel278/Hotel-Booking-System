import { useState } from "react"

const RoomFilter = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filteredrooms = data.filter((room) =>
            room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
        )
        setFilteredData(filteredrooms)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]

    return (
        <div className="room-filter-wrapper mb-4">
            <div className="input-group shadow-sm">
                <span className="input-group-text fw-semibold">
                    Filter rooms by type
                </span>

                <select
                    className="form-select"
                    value={filter}
                    onChange={handleSelectChange}
                >
                    <option value={""}>Select a room type</option>
                    {roomTypes.map((room, index) => (
                        <option key={index} value={String(room)}>
                            {String(room)}
                        </option>
                    ))}
                </select>

                <button
                    className="btn btn-outline-secondary btn-hotel"
                    type="button"
                    onClick={clearFilter}
                >
                    Clear
                </button>
            </div>
        </div>
    )
}

export default RoomFilter
