import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/common/Navbar';
import HomePage from './component/home/HomePage';
import AllRoomsPage from './component/booking_rooms/AllRoomsPage';
import FindBookingPage from './component/booking_rooms/FindBookingPage';
import RoomDetailsPage from './component/booking_rooms/RoomDetailsPage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import { ProtectedRoute, AdminRoute } from './service/guard';
import AdminPage from './component/admin/AdminPage';
import ManageRoomPage from './component/admin/ManageRoomPage';
import EditRoomPage from './component/admin/EditRoomPage';
import AddRoomPage from './component/admin/AddRoomPage';
import ManageBookingsPage from './component/admin/ManageBookingsPage';
import EditBookingPage from './component/admin/EditBookingPage';
import Review from './component/checkout/Review';
import PaymentSuccess from './component/checkout/PaymentSuccess';
import PaymentError from './component/checkout/PaymentError';
import MainLayout from './component/common/MainLayout'; // Adjust path as necessary
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <div className="App">
        <NavBar />
        <MainLayout>
          <Routes>

            {/* Public routes */}
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/rooms' element={<AllRoomsPage />} />
            <Route exact path='/find-booking' element={<FindBookingPage />} />
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/register' element={<RegisterPage />} />

            {/* Authenticated routes */}
            <Route exact path='/room-details-book/:roomId' element={<ProtectedRoute element={<RoomDetailsPage />} />} />
            <Route exact path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route exact path='/edit-profile' element={<ProtectedRoute element={<EditProfilePage />} />} />

            {/* Payment routes */}
            <Route exact path='/review' element={<ProtectedRoute element={<Review />} />} />
            <Route exact path='/payment/success' element={<ProtectedRoute element={<PaymentSuccess />} />} />
            <Route exact path='/payment/cancel' element={<ProtectedRoute element={<HomePage />} />} />
            <Route exact path='/payment/error' element={<ProtectedRoute element={<PaymentError />} />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
            <Route path="/admin/manage-rooms" element={<AdminRoute element={<ManageRoomPage />} />} />
            <Route path="/admin/edit-room/:roomId" element={<AdminRoute element={<EditRoomPage />} />} />
            <Route path="/admin/add-room" element={<AdminRoute element={<AddRoomPage />} />} />
            <Route path="/admin/manage-bookings" element={<AdminRoute element={<ManageBookingsPage />} />} />
            <Route path="/admin/edit-booking/:bookingCode" element={<AdminRoute element={<EditBookingPage />} />} />

            {/* Non-existing routes */}
            <Route path='*' element={<Navigate to="/" />} />

          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
