import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Paper } from '@mui/material';
import ApiService from '../../service/ApiService';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const PaymentSuccess = () => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [message, setMessage] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const query = useQuery();

    // Use a ref to ensure the function runs only once
    const hasExecutedRef = useRef(false);

    useEffect(() => {
        const fetchPaymentAndBookRoom = async () => {
            try {
                const paymentId = query.get('paymentId');
                const PayerID = query.get('PayerID');

                if (!paymentId || !PayerID) {
                    throw new Error('Invalid payment details.');
                }

                // Fetch payment details
                const paymentResponse = await ApiService.fetchPaymentDetails(paymentId, PayerID);
                console.log('Payment Response:', paymentResponse);

                if (paymentResponse && paymentResponse.paymentId) {
                    setPaymentDetails(paymentResponse);

                    // Retrieve booking details from localStorage
                    const storedBookingDetails = localStorage.getItem('bookingDetails');
                    console.log('Stored Booking Details:', storedBookingDetails);

                    const bookingRequest = storedBookingDetails ? JSON.parse(storedBookingDetails) : null;
                    console.log('Parsed Booking Request:', bookingRequest);

                    const booking = bookingRequest ? {
                        checkInDate: bookingRequest.checkInDate,
                        checkOutDate: bookingRequest.checkOutDate,
                        numberOfAdults: bookingRequest.numberOfAdults,
                        numberOfChildren: bookingRequest.numberOfChildren,
                    } : null;

                    if (bookingRequest) {
                        const bookingResponse = await ApiService.bookRoom(bookingRequest?.room?.id, bookingRequest?.user?.id, booking);
                        console.log('Booking Response:', bookingResponse);

                        if (bookingResponse?.statusCode === 200) {
                            setMessage(bookingResponse?.message);
                            setConfirmationCode(bookingResponse?.bookingConfirmationCode);
                            setBookingDetails(bookingResponse?.booking);
                            // Clear booking details from localStorage after successful booking
                            localStorage.removeItem('bookingDetails');
                        } else {
                            setError('Booking failed.');
                        }
                    } else {
                        setError('Booking details not found.');
                    }
                } else {
                    setError(paymentResponse.message || 'No payment details found.');
                }
            } catch (error) {
                setError(error.message || 'Error fetching payment or booking details.');
            } finally {
                setIsLoading(false);
            }
        };

        // Check if the function has already executed
        if (!hasExecutedRef.current) {
            fetchPaymentAndBookRoom();
            hasExecutedRef.current = true;  // Set the ref to true after executing the function
        }
    }, [query]);  // Ensure query is included in the dependency array

    if (isLoading) {
        return (
            <Container>
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Box display="flex" justifyContent="center" mt={5}>
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box mt={5} component={Paper} p={4}>
                <Typography variant="h4" gutterBottom>
                    Payment Successful!
                </Typography>
                <Typography variant="body1">
                    <strong>Payment ID:</strong> {paymentDetails.paymentId}
                </Typography>
                <Typography variant="body1">
                    <strong>Status:</strong> {paymentDetails.paymentStatus}
                </Typography>
                <Typography variant="body1">
                    <strong>Created At:</strong> {paymentDetails.createTime}
                </Typography>
                <Typography variant="body1">
                    <strong>Payer Email:</strong> {paymentDetails.payerEmail}
                </Typography>
                <Typography variant="body1">
                    <strong>Payer First Name:</strong> {paymentDetails.payerFirstName}
                </Typography>
                <Typography variant="body1">
                    <strong>Payer Last Name:</strong> {paymentDetails.payerLastName}
                </Typography>
                <Typography variant="body1">
                    <strong>Amount:</strong> {paymentDetails.amount} {paymentDetails.currency}
                </Typography>

                {bookingDetails && (
                    <Box mt={4}>
                        <Typography variant="h5" gutterBottom>
                            {message}
                        </Typography>
                        <Typography variant="body1">
                        <strong>Booking Confirmation Code:</strong> <strong style={{ color: 'blue' }}>{confirmationCode}</strong>
                        </Typography>
                        <Typography variant="body1">
                            <strong>Booking ID:</strong> {bookingDetails.id}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Check-In Date:</strong> {bookingDetails.checkInDate}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Check-Out Date:</strong> {bookingDetails.checkOutDate}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Total Guests:</strong> {bookingDetails.numberOfAdults + bookingDetails.numberOfChildren}
                        </Typography>
                    </Box>
                )}
            </Box>
            <Typography variant="body2" color="warning.main" mt={2} align="center">
                Don't refresh the page!!!
            </Typography>
        </Container>
    );
};

export default PaymentSuccess;
