import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import { Box, Typography } from "@mui/material";

const HomePage = () => {

    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home">
            {/* <section>
                <header className="header-banner">
                    <img src="./assets/images/hotel_1.webp" alt="Hotel More" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="more-color"> Hotel More</span>
                        </h1><br />
                        <h3>Step into a haven of comfort and care</h3>
                    </div>
                </header>
            </section> */}
            <Box component="section">
                <Box component="header" sx={{ position: 'relative' }}>
                    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
                        <Box
                            component="img" src="./assets/images/hotel_2.jpg" alt="Hotel More"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                        />
                    </Box>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></Box>
                    <Box  sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff' }}>
                        <Typography variant="h2" margin={2}>
                            Welcome to Hotel More
                        </Typography>
                        <Typography variant="h4" margin={2}>Step into a haven of comfort and care</Typography>
                    </Box>
                </Box>
            </Box>

            {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
            <RoomSearch handleSearchResult={handleSearchResult} />
            <RoomResult roomSearchResults={roomSearchResults} />

            <h4><a className="view-rooms-home" href="/rooms">All Rooms</a></h4>

            <h2 className="home-services">Services at <span className="more-color">Hotel More</span></h2>

            {/* SERVICES SECTION */}
            <section className="service-section"><div className="service-card">
                <img src="./assets/images/ac.png" alt="Air Conditioning" />
                <div className="service-details">
                    <h3 className="service-title">Air Conditioning</h3>
                    <p className="service-description">Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.</p>
                </div>
            </div>
                <div className="service-card">
                    <img src="./assets/images/mini-bar.png" alt="Mini Bar" />
                    <div className="service-details">
                        <h3 className="service-title">Mini Bar</h3>
                        <p className="service-description">Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/parking.png" alt="Parking" />
                    <div className="service-details">
                        <h3 className="service-title">Parking</h3>
                        <p className="service-description">We offer on-site parking for your convenience . Please inquire about valet parking options if available.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/wifi.png" alt="WiFi" />
                    <div className="service-details">
                        <h3 className="service-title">WiFi</h3>
                        <p className="service-description">Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;



// import React, { useState } from "react";
// import RoomResult from "../common/RoomResult";
// import RoomSearch from "../common/RoomSearch";
// import { Box, Typography } from "@mui/material";

// const HomePage = () => {

//     const [roomSearchResults, setRoomSearchResults] = useState([]);

//     const handleSearchResult = (results) => {
//         setRoomSearchResults(results);
//     };

//     return (
//         <div className="home">
//             {/* <section>
//                 <header className="header-banner">
//                     <img src="./assets/images/hotel_1.webp" alt="Hotel More" className="header-image" />
//                     <div className="overlay"></div>
//                     <div className="animated-texts overlay-content">
//                         <h1>
//                             Welcome to <span className="more-color"> Hotel More</span>
//                         </h1><br />
//                         <h3>Step into a haven of comfort and care</h3>
//                     </div>
//                 </header>
//             </section> */}
//             <Box component="section">
//                 <Box component="header" sx={{ position: 'relative' }}>
//                     <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
//                         <Box
//                             component="img" src="./assets/images/hotel_2.jpg" alt="Hotel More"
//                             sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
//                         />
//                     </Box>
//                     <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></Box>
//                     <Box  sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff' }}>
//                         <Typography variant="h2" margin={2}>
//                             Welcome to Hotel More
//                         </Typography>
//                         <Typography variant="h4" margin={2}>Step into a haven of comfort and care</Typography>
//                     </Box>
//                 </Box>
//             </Box>

//             {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
//             <RoomSearch handleSearchResult={handleSearchResult} />
//             <RoomResult roomSearchResults={roomSearchResults} />

//             <h4><a className="view-rooms-home" href="/rooms">All Rooms</a></h4>

//             <h2 className="home-services">Services at <span className="more-color">Hotel More</span></h2>

//             {/* SERVICES SECTION */}
//             <section className="service-section"><div className="service-card">
//                 <img src="./assets/images/ac.png" alt="Air Conditioning" />
//                 <div className="service-details">
//                     <h3 className="service-title">Air Conditioning</h3>
//                     <p className="service-description">Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.</p>
//                 </div>
//             </div>
//                 <div className="service-card">
//                     <img src="./assets/images/mini-bar.png" alt="Mini Bar" />
//                     <div className="service-details">
//                         <h3 className="service-title">Mini Bar</h3>
//                         <p className="service-description">Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.</p>
//                     </div>
//                 </div>
//                 <div className="service-card">
//                     <img src="./assets/images/parking.png" alt="Parking" />
//                     <div className="service-details">
//                         <h3 className="service-title">Parking</h3>
//                         <p className="service-description">We offer on-site parking for your convenience . Please inquire about valet parking options if available.</p>
//                     </div>
//                 </div>
//                 <div className="service-card">
//                     <img src="./assets/images/wifi.png" alt="WiFi" />
//                     <div className="service-details">
//                         <h3 className="service-title">WiFi</h3>
//                         <p className="service-description">Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.</p>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default HomePage;