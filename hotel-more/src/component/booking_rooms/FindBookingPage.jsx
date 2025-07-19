import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';
import ApiService from '../../service/ApiService';
import { extractImageName } from '../../service/util';

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please enter a booking confirmation code.");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <Container>
            <Box mt={5} p={3} component="form" noValidate autoComplete="off">
                <Typography variant="h4" gutterBottom>
                    Find Booking
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                        fullWidth
                        required
                        variant="outlined"
                        label="Enter your booking confirmation code"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        sx={{ ml: 2 }}
                    >
                        Find
                    </Button>
                </Box>
            </Box>
            {error && <Typography color="error" variant="body1">{error}</Typography>}
            {bookingDetails && (
                <Box mt={4} p={3} component={Paper}>
                    <Typography variant="h5" gutterBottom>
                        Booking Details
                    </Typography>
                    <Typography variant="body1"><strong>Confirmation Code:</strong> {bookingDetails.bookingConfirmationCode}</Typography>
                    <Typography variant="body1"><strong>Check-in Date:</strong> {bookingDetails.checkInDate}</Typography>
                    <Typography variant="body1"><strong>Check-out Date:</strong> {bookingDetails.checkOutDate}</Typography>
                    <Typography variant="body1"><strong>Number of Adults:</strong> {bookingDetails.numberOfAdults}</Typography>
                    <Typography variant="body1"><strong>Number of Children:</strong> {bookingDetails.numberOfChildren}</Typography>
                    <Box mt={3} mb={2}><hr /></Box>
                    <Typography variant="h5" gutterBottom>
                        Booker Details
                    </Typography>
                    <Typography variant="body1"><strong>Name:</strong> {bookingDetails.user.name}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {bookingDetails.user.email}</Typography>
                    <Typography variant="body1"><strong>Phone Number:</strong> {bookingDetails.user.phoneNumber}</Typography>
                    <Box mt={3} mb={2}><hr /></Box>
                    <Typography variant="h5" gutterBottom>
                        Room Details
                    </Typography>
                    <Typography variant="body1"><strong>Room Type:</strong> {bookingDetails.room.roomType}</Typography>
                    <Box mt={2}>
                        {/* <img src={extractImageName(bookingDetails.room.roomPhotoUrl)} alt="Room" width="30%" /> */}
                        <img
                            src={extractImageName(bookingDetails.room.roomPhotoUrl)}
                            alt="Room"
                            style={{ width: '25%', minWidth: '200px'}}
                        />

                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default FindBookingPage;