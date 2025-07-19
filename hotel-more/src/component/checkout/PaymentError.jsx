import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentError = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/payment'); 
    };

    return (
        <Container>
            <Box mt={5} component={Paper} p={4} textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Payment Error
                </Typography>
                <Typography variant="body1" color="error" gutterBottom>
                    Unfortunately, your payment could not be processed at this time. Please try again.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleRetry}>
                    Retry Payment
                </Button>
            </Box>
        </Container>
    );
};

export default PaymentError;
