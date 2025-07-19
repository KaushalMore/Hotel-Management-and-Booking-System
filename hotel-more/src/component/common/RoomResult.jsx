import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid, Box } from '@mui/material';
import ApiService from '../../service/ApiService';
import { extractImageName, formatPrice } from '../../service/util';

const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();

    return (
        <Grid container spacing={3}>
            {roomSearchResults && roomSearchResults.length > 0 && roomSearchResults.map(room => (
                <Grid item xs={12} key={room.id}>
                    <Card sx={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        padding: 2, 
                        borderRadius: 2, 
                        boxShadow: 4, 
                        backgroundColor: '#f5f5f5', 
                        margin: '20px 0' 
                    }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 200, borderRadius: 2 }}
                            image={extractImageName(room.roomPhotoUrl)}
                            alt={room.roomType}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {room.roomType}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {room.roomDescription}
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                    Price: {formatPrice(room.roomPrice)} / night
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {isAdmin ? (
                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                                    >
                                        Edit Room
                                    </Button>
                                ) : (
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => navigate(`/room-details-book/${room.id}`)}
                                    >
                                        View/Book Now
                                    </Button>
                                )}
                            </CardActions>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default RoomResult;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid, Box } from '@mui/material';
// import ApiService from '../../service/ApiService';
// import { extractImageName, formatPrice } from '../../service/util';

// const RoomResult = ({ roomSearchResults }) => {
//     const navigate = useNavigate();
//     const isAdmin = ApiService.isAdmin();

//     return (
//         <Grid container spacing={3}>
//             {roomSearchResults && roomSearchResults.length > 0 && roomSearchResults.map(room => (
//                 <Grid item xs={12} key={room.id}>
//                     <Card sx={{ display: 'flex', flexDirection: 'row', padding: 2 }}>
//                         <CardMedia
//                             component="img"
//                             sx={{ width: 200}}
//                             image={extractImageName(room.roomPhotoUrl)}
//                             alt={room.roomType}
//                         />
//                         <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     {room.roomType}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                                     {room.roomDescription}
//                                 </Typography>
//                                 <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
//                                     Price: {formatPrice(room.roomPrice)} / night
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 {isAdmin ? (
//                                     <Button
//                                         size="small"
//                                         color="secondary"
//                                         onClick={() => navigate(`/admin/edit-room/${room.id}`)}
//                                     >
//                                         Edit Room
//                                     </Button>
//                                 ) : (
//                                     <Button
//                                         size="small"
//                                         color="primary"
//                                         onClick={() => navigate(`/room-details-book/${room.id}`)}
//                                     >
//                                         View/Book Now
//                                     </Button>
//                                 )}
//                             </CardActions>
//                         </Box>
//                     </Card>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }

// export default RoomResult;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
// import ApiService from '../../service/ApiService';
// import { extractImageName, formatPrice } from '../../service/util';

// const RoomResult = ({ roomSearchResults }) => {
//     const navigate = useNavigate();
//     const isAdmin = ApiService.isAdmin();

//     return (
//         <Grid container spacing={3}>
//             {roomSearchResults && roomSearchResults.length > 0 && roomSearchResults.map(room => (
//                 <Grid item xs={12} md={6} lg={4} key={room.id}>
//                     <Card>
//                         <CardMedia
//                             component="img"
//                             height="140"
//                             image={extractImageName(room.roomPhotoUrl)}
//                             alt={room.roomType}
//                         />
//                         <CardContent>
//                             <Typography gutterBottom variant="h5" component="div">
//                                 {room.roomType}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 {room.roomDescription}
//                             </Typography>
//                             <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
//                                 Price: {formatPrice(room.roomPrice)} / night
//                             </Typography>
//                         </CardContent>
//                         <CardActions>
//                             {isAdmin ? (
//                                 <Button
//                                     size="small"
//                                     color="secondary"
//                                     onClick={() => navigate(`/admin/edit-room/${room.id}`)}
//                                 >
//                                     Edit Room
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     size="small"
//                                     color="primary"
//                                     onClick={() => navigate(`/room-details-book/${room.id}`)}
//                                 >
//                                     View/Book Now
//                                 </Button>
//                             )}
//                         </CardActions>
//                     </Card>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }

// export default RoomResult;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ApiService from '../../service/ApiService';
// import { extractImageName, formatPrice } from '../../service/util';

// const RoomResult = ({ roomSearchResults }) => {

//     const navigate = useNavigate();
//     const isAdmin = ApiService.isAdmin();

//     return (
//         <section className="room-results">
//             {roomSearchResults && roomSearchResults.length > 0 && (
//                 <div className="room-list">
//                     {roomSearchResults.map(room => (
//                         <div key={room.id} className="room-list-item">
//                             <img className='room-list-item-image' src={extractImageName(room.roomPhotoUrl)} alt={room.roomType} />
//                             <div className="room-details">
//                                 <h3>{room.roomType}</h3>
//                                 <p className="room-price">Price: {formatPrice(room.roomPrice)} / night</p> {/* make it colored so it will highlight */}
//                                 <p>Description: {room.roomDescription}</p>
//                             </div>

//                             <div className='book-now-div'>
//                                 {isAdmin ? (
//                                     <button
//                                         className="edit-room-button"
//                                         onClick={() => navigate(`/admin/edit-room/${room.id}`)}
//                                     >
//                                         Edit Room
//                                     </button>
//                                 ) : (
//                                     <button
//                                         className="book-now-button"
//                                         onClick={() => navigate(`/room-details-book/${room.id}`)}
//                                     >
//                                         View/Book Now
//                                     </button>
//                                 )}
//                             </div>

//                         </div>
//                     ))}
//                 </div>
//             )}
//         </section>
//     );
// }

// export default RoomResult;