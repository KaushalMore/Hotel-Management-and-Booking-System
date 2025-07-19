import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { formatPrice } from '../../service/util';
import ApiService from '../../service/ApiService';

const Review = () => {
    const { state } = useLocation();
    const { checkInDate, checkOutDate, numAdults, numChildren, totalPrice } = state || {};
    const navigate = useNavigate();

    const handleProceedToPayment = () => {
        // ApiService.payment(totalPrice);
        ApiService.payment(10);
    };

    return (
        <div className="review-page" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <Typography variant="h6" gutterBottom align="center">
                Review Your Booking
            </Typography>
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} align="center">
                                <Typography variant="subtitle1">Booking Details</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Check-in</TableCell>
                            <TableCell>{checkInDate?.toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Check-out</TableCell>
                            <TableCell>{checkOutDate?.toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Adults</TableCell>
                            <TableCell>{numAdults}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Children</TableCell>
                            <TableCell>{numChildren}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Price</TableCell>
                            <TableCell>{formatPrice(totalPrice)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="total-price" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant="h6">Total Price: {formatPrice(totalPrice)}</Typography>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Button variant="contained" color="primary" onClick={handleProceedToPayment}>
                    Proceed to Payment
                </Button>
            </div>
        </div>


    );
};

export default Review;
