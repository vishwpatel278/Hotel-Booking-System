import './App.css'
import Home from './home/Home'
import AddRoom from './room/AddRoom'
import EditRoom from './room/EditRoom'
import ExistingRoom from './room/ExistingRoom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import RoomListing from './room/RoomListing'
import Admin from './admin/Admin'
import BookingSuccess from './booking/BookingSuccess'
import CheckOut from './booking/CheckOut'
import Bookings from './booking/Bookings'
import FindBooking from './booking/FindBooking'
import Login from './auth/Login'
import Registration from './auth/Registration'
import Profile from './auth/Profile'
import { AuthProvider } from './auth/AuthProvider'
import RequireAuth from './auth/RequireAuth'
import Verify from './auth/Verify'
import EmailForResetPassword from './auth/EmailForRestPassword'
import VerifyForResetPassword from './auth/VerifyForResetPassword'
import ResetPassword from './auth/ResetPassword'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/edit-room/:roomid" element={<EditRoom />} />
            <Route path="/book-room/:roomId" element={<RequireAuth><CheckOut /></RequireAuth>} />
            <Route path="/existing-rooms" element={<ExistingRoom />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route path="/find-booking" element={<FindBooking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/EmailToResetPassword" element={<EmailForResetPassword />} />
            <Route path="/VerifyForReset" element={<VerifyForResetPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
