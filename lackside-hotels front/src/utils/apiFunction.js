import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:8080"
});

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export async function addRoom(photo , roomType, roomPrice) {
    const formdata = new FormData();
    formdata.append("photo" , photo)
    formdata.append("roomType" , roomType)
    formdata.append("roomPrice" , roomPrice)
    const token = localStorage.getItem("token")
    const response = await api.post("/rooms/add/new-room",formdata,{
        headers : {Authorization: `Bearer ${token}`,
		"Content-Type": "multipart/form-data"}
    });

    if(response.status == 201){return true;}
    else{ return false;}
}

export async function getRoomTypes() {
    try{
        const response = await api.get("/rooms/room/types");
        return response.data;
    }catch(error){
        throw new Error("error occured");
    }
}

export async function getAllRooms() {
    try{
        const response = await api.get("/rooms/all-rooms");
        return response.data;
    }catch(error){
        throw new Error("error occured");
    }
}

export async function deleteRoombyId(roomid) {
    try{
        const response = await api.delete(`/rooms/delete/${roomid}`,{
            headers: getHeader()
        });
        return response.data;
    }catch(error){
        throw new Error("error occured");
    }
}

export async function updateRoomByid(roomId , RoomData) {
    const formdata = new FormData();
    formdata.append("roomType" , RoomData.roomType)
    formdata.append("roomPrice" , RoomData.roomPrice)
    formdata.append("photo" , RoomData.photo)
    const response = await api.put(`/rooms/update-room/${roomId}`,formdata,{
        headers: getHeader()
    });
    return response;
}

export async function getRoomById(roomId) {
    try{
        const response = await api.get(`/rooms/room/${roomId}`);
        return response.data;
    }catch(error){
        throw new Error("error occured");
    }
}

export async function saveBookings(roomId,bookingRequest) {
    try{
        const response = await api.post(`/bookings/room/${roomId}/booking`,bookingRequest,{
            headers: getHeader()
        });
        return response.data;
    }catch(error){
        throw new Error("error occured");
    }
}

export async function getAllBookings() {
    try{
        const response = await api.get("/bookings/getallBookings",{
            headers: getHeader()
        });
        return response.data;
    }catch(error){
        throw new Error("error occured");
    }
}

export async function getBookingByConfirmationCode(conformationcode) {
    try{
        const response = await api.get(`/bookings/confirmation/${conformationcode}`,{
            headers : getHeader()
        });
        return response.data;
    }catch(error){
        throw new Error("error occured");
    }
}

export async function cancelBooking(bookingId) {
    try{
        const response = await api.delete(`/bookings/booking/${bookingId}/delete`,{
            headers : getHeader()
        });
        return response.data;
    }catch(error){
        throw new Error("error occured");
    }
}

export async function getAvailableRooms(checkInDate,checkOutDate,roomType) {
    try{
        const response = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
        return response;
    }catch(e){
        throw new Error("error occured");
    }
}

export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error.message
	}
}

export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error.message
	}
}

export async function getBookingsByUserId(email, token) {
	try {
		const response = await api.get(`/bookings/user/${email}/bookings`, {
			headers: getHeader()
		})
        console.log(response.data);
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

export async function VerifyUser(email,otp) {
    const VerifyUserDto  = {
        verificationCode : otp,
        email : email
    }
    try{
        const response = await api.post("/auth/verify",VerifyUserDto);

        return response.data;

    }catch(e){
        throw new Error(e.message);
    }

}

export async function resendOtp(email) {
    try{
        const response = await api.post(`/auth/resend?email=${email}`);
        return response.data;

    }catch(e){
        throw new Error(e.message);
    }
}

export async function VerifyExistingUser(email) {
    const VerifyUserDto  = {
        email
    }
    try{
        const response = await api.post(`/auth/sendOtp-to-login?email=${email}`);

        return response.data;

    }catch(e){
        throw new Error(e.message);
    }

}

export async function ResetpasswordofUser(email,password) {
    const input  = {
        email : email,
        password : password
    }
    try{
        const response = await api.post("/auth/reset-password",input);
        return response.data;
    }catch(e){
        throw new Error(e.message);
    }

}