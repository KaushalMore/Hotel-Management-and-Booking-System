import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Paginations';
import RoomResult from '../common/RoomResult';
import RoomSearch from '../common/RoomSearch';

const AllRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await ApiService.getAllRooms();
                const allRooms = response.roomList;
                setRooms(allRooms);
                setFilteredRooms(allRooms);
            } catch (error) {
                console.error('Error fetching rooms:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        };

        fetchRooms();
        fetchRoomTypes();
    }, []);

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
        filterRooms(e.target.value);
    };

    const filterRooms = (type) => {
        if (type === '') {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === type);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Pagination
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container> 
            {/* <Container maxWidth={false} disableGutters> */}
            <Box mt={4} mb={2}>
                <Typography variant="h4" gutterBottom>
                    All Rooms
                </Typography>
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Filter by Room Type</InputLabel>
                    <Select value={selectedRoomType} onChange={handleRoomTypeChange} label="Filter by Room Type">
                        <MenuItem value="">All</MenuItem>
                        {roomTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <RoomSearch handleSearchResult={setFilteredRooms} />

            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : (
                <RoomResult roomSearchResults={currentRooms} />
            )}

            <Pagination
                roomsPerPage={roomsPerPage}
                totalRooms={filteredRooms.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </Container>
    );
};

export default AllRoomsPage;



// import React, { useState, useEffect } from 'react';
// import ApiService from '../../service/ApiService';
// import Pagination from '../common/Paginations';
// import RoomResult from '../common/RoomResult';
// import RoomSearch from '../common/RoomSearch';


// const AllRoomsPage = () => {
//     const [rooms, setRooms] = useState([]);
//     const [filteredRooms, setFilteredRooms] = useState([]);
//     const [roomTypes, setRoomTypes] = useState([]);
//     const [selectedRoomType, setSelectedRoomType] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [roomsPerPage] = useState(5);

//     // Function to handle search results
//     const handleSearchResult = (results) => {
//         setRooms(results);
//         setFilteredRooms(results);
//     };


//     useEffect(() => {
//         const fetchRooms = async () => {
//             try {
//                 const response = await ApiService.getAllRooms();
//                 const allRooms = response.roomList;
//                 setRooms(allRooms);
//                 setFilteredRooms(allRooms);
//             } catch (error) {
//                 console.error('Error fetching rooms:', error.message);
//             }
//         };

//         const fetchRoomTypes = async () => {
//             try {
//                 const types = await ApiService.getRoomTypes();
//                 setRoomTypes(types);
//             } catch (error) {
//                 console.error('Error fetching room types:', error.message);
//             }
//         };

//         fetchRooms();
//         fetchRoomTypes();
//     }, []);

//     const handleRoomTypeChange = (e) => {
//         setSelectedRoomType(e.target.value);
//         filterRooms(e.target.value);
//     };

//     const filterRooms = (type) => {
//         if (type === '') {
//             setFilteredRooms(rooms);
//         } else {
//             const filtered = rooms.filter((room) => room.roomType === type);
//             setFilteredRooms(filtered);
//         }
//         setCurrentPage(1); // Reset to first page after filtering
//     };

//     // Pagination
//     const indexOfLastRoom = currentPage * roomsPerPage;
//     const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
//     const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className='all-rooms'>
//             <h2>All Rooms</h2>
//             <div className='all-room-filter-div'>
//                 <label>Filter by Room Type:</label>
//                 <select value={selectedRoomType} onChange={handleRoomTypeChange}>
//                     <option value="">All</option>
//                     {roomTypes.map((type) => (
//                         <option key={type} value={type}>
//                             {type}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <RoomSearch handleSearchResult={handleSearchResult} />
//             <RoomResult roomSearchResults={currentRooms} />

//             <Pagination
//                 roomsPerPage={roomsPerPage}
//                 totalRooms={filteredRooms.length}
//                 currentPage={currentPage}
//                 paginate={paginate}
//             />
//         </div>
//     );
// };

// export default AllRoomsPage;