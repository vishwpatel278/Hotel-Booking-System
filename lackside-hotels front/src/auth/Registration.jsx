import React, { useState } from "react"
import { registerUser } from "../utils/apiFunction"
import { Link, useNavigate } from "react-router-dom"

const Registration = () => {
	const navigate = useNavigate();
	const [registration, setRegistration] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			navigate("/verify", {
			state: {
				email: registration.email
			}
			});
			setErrorMessage("")
			setRegistration({ firstName: "", lastName: "", email: "", password: "" })
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}

	return (
		<div className="container d-flex justify-content-center align-items-center min-vh-100">
			<div className="card shadow-lg p-4 register-card">
				<h2 className="text-center mb-4">Create Account</h2>

				{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
				{successMessage && <div className="alert alert-success">{successMessage}</div>}

				<form onSubmit={handleRegistration}>
					<div className="mb-3">
						<label htmlFor="firstName" className="form-label">
							First Name
						</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="form-control"
							value={registration.firstName}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="lastName" className="form-label">
							Last Name
						</label>
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="form-control"
							value={registration.lastName}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={registration.password}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="d-grid mb-3">
						<button type="submit" className="btn btn-primary btn-hotel">
							Register
						</button>
					</div>

					<p className="text-center mb-0">
						Already have an account?
						<Link to={"/login"} className="ms-1">
							Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Registration
