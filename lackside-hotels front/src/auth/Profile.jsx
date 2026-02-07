import React, { useEffect, useState } from "react"
import { deleteUser, getBookingsByUserId, getUser } from "../utils/apiFunction"
import { useNavigate } from "react-router-dom"
import moment from "moment"

const Profile = () => {
	const [user, setUser] = useState({
		userId: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})

	const [bookings, setBookings] = useState([
		{
			bookingId: "",
			room: { roomId: "", roomType: "" },
			checkInDate: "",
			checkOutDate: "",
			BookingConfirmationCode: ""
		}
	])
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				setUser(userData)
			} catch (error) {
				console.error(error)
			}
		}
		fetchUser()
	}, [userId])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userId, token)
				setBookings(response)
			} catch (error) {
				setErrorMessage(error.message)
			}
		}
		fetchBookings()
	}, [userId])

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone."
		)
		if (confirmed) {
			await deleteUser(userId)
				.then((response) => {
					setMessage(response.data)
					localStorage.clear()
					navigate("/")
					window.location.reload()
				})
				.catch((error) => {
					setErrorMessage(error.data)
				})
		}
	}

	return (
		<div className="container py-5">
			{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
			{message && <div className="alert alert-warning">{message}</div>}

			<div className="card shadow-lg profile-card">
				<div className="card-body">
					<h3 className="text-center mb-4">User Profile</h3>

					<div className="row align-items-center mb-4">
						<div className="col-md-3 text-center">
							<img
								src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
								alt="Profile"
								className="rounded-circle img-fluid profile-img"
							/>
						</div>

						<div className="col-md-9">
							<div className="row mb-2">
								<div className="col-md-4 fw-bold">User ID:</div>
								<div className="col-md-8">{user.userId}</div>
							</div>
							<div className="row mb-2">
								<div className="col-md-4 fw-bold">First Name:</div>
								<div className="col-md-8">{user.firstName}</div>
							</div>
							<div className="row mb-2">
								<div className="col-md-4 fw-bold">Last Name:</div>
								<div className="col-md-8">{user.lastName}</div>
							</div>
							<div className="row mb-2">
								<div className="col-md-4 fw-bold">Email:</div>
								<div className="col-md-8">{user.email}</div>
							</div>
							<div className="row">
								<div className="col-md-4 fw-bold">Roles:</div>
								<div className="col-md-8">
									{user.roles.map((role) => (
										<span key={role.id} className="badge bg-primary me-2">
											{role.name}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>

					<hr />

					<h4 className="text-center mb-3">Booking History</h4>

					{bookings.length > 0 ? (
						<div className="table-responsive">
							<table className="table table-striped table-hover shadow-sm">
								<thead className="table-dark">
									<tr>
										<th>Booking ID</th>
										<th>Room ID</th>
										<th>Room Type</th>
										<th>Check In</th>
										<th>Check Out</th>
										<th>Confirmation</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{bookings.map((booking, index) => (
										<tr key={index}>
											<td>{booking.bookingId}</td>
											<td>{booking.room.roomId}</td>
											<td>{booking.room.roomType}</td>
											<td>{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</td>
											<td>{moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}</td>
											<td>{booking.BookingConfirmationCode}</td>
											<td className="text-success fw-bold">On-going</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p className="text-center">You have not made any bookings yet.</p>
					)}

					<div className="text-center mt-4">
						<button className="btn btn-outline-danger btn-sm" onClick={handleDeleteAccount}>
							Close Account
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
