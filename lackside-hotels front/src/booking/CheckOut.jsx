import { useEffect, useState } from "react"
import BookingForm from "./BookingForm"
import { useParams } from "react-router-dom"
import { getRoomById } from "../utils/apiFunction"
import RoomCarousel from "../room/RoomCarousel"
import { FaWifi, FaUtensils } from "react-icons/fa"

const CheckOut = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [room, setRoom] = useState({
        roomType: "",
        roomPrice: "",
        photo: ""
    })

    const { roomId } = useParams()

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId)
                .then((response) => {
                    setRoom(response)
                    setLoading(false)
                })
                .catch((error) => {
                    setError(error)
                    setLoading(false)
                })
        }, 2000)
    }, [roomId])

    return (
        <div className="checkout-page bg-light min-vh-100 py-5">
            <section className="container">
                <div className="row justify-content-center g-4">

                    {/* Room Info */}
                    <div className="col-lg-4 col-md-5">
                        <div className="card shadow-lg border-0 rounded-4 h-100 overflow-hidden">
                            {loading ? (
                                <div className="card-body d-flex flex-column justify-content-center align-items-center py-5">
                                    <div className="spinner-border text-primary mb-3" />
                                    <p className="text-muted small mb-0">
                                        Loading room information...
                                    </p>
                                </div>
                            ) : error ? (
                                <div className="card-body text-center text-danger fw-semibold py-5">
                                    {error}
                                </div>
                            ) : (
                                <>
                                    <img
                                        src={`data:image/png;base64,${room.photo}`}
                                        alt="Room"
                                        className="card-img-top checkout-room-img"
                                    />

                                    <div className="card-body px-4 py-4">
                                        <h5 className="text-center fw-bold mb-4">
                                            Room Details
                                        </h5>

                                        <table className="table table-sm table-borderless mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="text-muted fw-normal">
                                                        Room Type
                                                    </th>
                                                    <td className="fw-semibold text-end">
                                                        {room.roomType}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-muted fw-normal">
                                                        Price / Night
                                                    </th>
                                                    <td className="fw-bold text-end text-primary">
                                                        ${room.roomPrice}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="d-flex justify-content-between text-center mt-4 checkout-amenities">
                                            <div className="flex-fill">
                                                <FaWifi className="text-primary fs-4 mb-1" />
                                                <p className="small fw-semibold mb-0">Free Wi-Fi</p>
                                                <span className="text-muted small">
                                                    High-speed access
                                                </span>
                                            </div>

                                            <div className="flex-fill">
                                                <FaUtensils className="text-success fs-4 mb-1" />
                                                <p className="small fw-semibold mb-0">Food</p>
                                                <span className="text-muted small">
                                                    Breakfast included
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="col-lg-6 col-md-7">
                        <div className="card shadow-lg border-0 rounded-4 h-100">
                            <div className="card-body px-4 px-lg-5 py-4">
                                <h4 className="text-center fw-bold mb-4">
                                    Complete Your Booking
                                </h4>
                                <BookingForm />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Carousel */}
            <div className="container mt-5 pt-4">
                <div className="bg-white rounded-4 shadow-sm p-4">
                    <RoomCarousel />
                </div>
            </div>
        </div>
    )
}

export default CheckOut
