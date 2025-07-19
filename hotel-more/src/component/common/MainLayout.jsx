import React from 'react';
import { Box } from '@mui/material';
import Footer from './Footer'; // Adjust path as necessary

const MainLayout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'space-between',
            }}
        >
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default MainLayout;



// import React from 'react';
// import { Box, Container } from '@mui/material';
// import Footer from './Footer'; // Adjust path as necessary

// const MainLayout = ({ children }) => {
//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 minHeight: '90vh',
//                 justifyContent: 'space-between',
//             }}
//         >
//             <Container component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//                 {children}
//             </Container>
//             <Footer />
//         </Box>
//     );
// };

// export default MainLayout;
