import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'whitesmoke',
                textAlign: 'center',
                padding: '1rem',
                position: 'relative',
                bottom: 0,
                width: '100%',
                mt: 'auto',
            }}
        >
            <Typography>
                Hotel More | All Right Reserved &copy; {new Date().getFullYear()}
            </Typography>
        </Box>
    );
};

export default Footer;
