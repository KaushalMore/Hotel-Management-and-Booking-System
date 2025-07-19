import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { Typography, Button, TextField, Grid, Paper, Card, CardMedia, CardContent, Container } from '@mui/material';
import { extractImageName, formatPrice } from '../../service/util';

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [userId, setUserId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleConfirmBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Please enter valid numbers for adults and children.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.round(Math.abs((checkOutDate - checkInDate) / oneDay)) + 1;
    const price = roomDetails.roomPrice * totalDays;
    const guests = numAdults + numChildren;

    setTotalPrice(price);
    setTotalGuests(guests);

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    const booking = {
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      numberOfAdults: numAdults,
      numberOfChildren: numChildren,
      user: {
        id: userId
      },
      room: {
        id: roomId
      }
    };

    // api call for freeze booking 
    try {

      localStorage.setItem('bookingDetails', JSON.stringify(booking));

      const res = await ApiService.freezeRoom(roomId, userId, booking);
      console.log('Response from freezeRoom:', res);
      if (res.statusCode === 200) {
        console.log('Room successfully frozen, redirecting to review page...');
        navigate('/review', {
          state: {
            checkInDate, checkOutDate, numAdults, numChildren, totalPrice: price,
          },
        });
      }
      else {
        setErrorMessage(res.message || 'Failed to freeze room. Please try again.');
        console.log('Error message:', res.message);
      }
    } catch (error) {
      localStorage.removeItem('bookingDetails')
      console.error('Error during freezing room:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  if (isLoading) return <Typography variant="h6">Loading room details...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;
  if (!roomDetails) return <Typography variant="h6" color="error">Room not found.</Typography>;

  const { roomType, roomPrice, roomPhotoUrl, roomDescription, bookings } = roomDetails;

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      
      {showMessage && (
        <Typography variant="h6" color="primary">
          Booking successful! Confirmation code: {confirmationCode}.
        </Typography>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt={roomType}
              height="300"
              image={extractImageName(roomPhotoUrl)}
            />
            <CardContent>
              <Typography variant="h5">{roomType}</Typography>
              <Typography variant="body1">{roomDescription}</Typography>
              <Typography variant="h6">Price: {formatPrice(roomPrice)} / night</Typography>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Book Your Stay</Typography>
            {showBookingForm ? (
              <>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <DatePicker
                  className="detail-search-field"
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  placeholderText="Check-in Date"
                  dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                  className="detail-search-field"
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={checkInDate}
                  placeholderText="Check-out Date"
                  dateFormat="dd/MM/yyyy"
                />
                <TextField
                  label="Number of Adults"
                  type="number"
                  value={numAdults}
                  onChange={(e) => setNumAdults(parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 1 } }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Number of Children"
                  type="number"
                  value={numChildren}
                  onChange={(e) => setNumChildren(parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleConfirmBooking}
                  style={{ marginTop: '20px' }}
                >
                  Confirm Booking
                </Button>
                {totalPrice > 0 && (
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h6">Total Price: {formatPrice(totalPrice)}</Typography>
                    <Typography variant="body1">Total Guests: {totalGuests}</Typography>
                  </div>
                )}
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowBookingForm(true)}
                style={{ marginTop: '20px' }}
              >
                Book Now
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
      {bookings?.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>Existing Booking Details</Typography>
          <ul>
            {bookings.map((booking, index) => (
              <li key={booking.id}>
                <Typography variant="body2">Booking {index + 1}: {booking.checkInDate} - {booking.checkOutDate}</Typography>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default RoomDetailsPage;
