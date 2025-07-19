package com.hotel.hotelmore.service.impl;

import com.hotel.hotelmore.dto.BookingDTO;
import com.hotel.hotelmore.dto.Response;
import com.hotel.hotelmore.entity.Booking;
import com.hotel.hotelmore.entity.Room;
import com.hotel.hotelmore.entity.User;
import com.hotel.hotelmore.exception.MyException;
import com.hotel.hotelmore.repository.BookingRepository;
import com.hotel.hotelmore.repository.RoomRepository;
import com.hotel.hotelmore.repository.UserRepository;
import com.hotel.hotelmore.service.intefaces.BookingService;
import com.hotel.hotelmore.utils.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final LockService lockService;

    private static final long LOCK_TIME = 5 * 60L;   // 5 minutes in seconds

    @Override
    public Response freezeBooking(Long roomId, Long userId, Booking bookingRequest) {
        Response res = new Response();
        String lockKey = roomId + ":" + bookingRequest.getCheckInDate() + ":" + bookingRequest.getCheckOutDate();

        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new IllegalArgumentException("Check-in date must come before checkout date");
        }

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MyException("Room Not Found"));
            userRepository.findById(userId).orElseThrow(() -> new MyException("User Not Found"));

            List<Booking> existingBookings = room.getBookings();
            if (!roomIsAvailable(bookingRequest, existingBookings)) {
                throw new MyException("Room not available for selected date range");
            }

            // Check for overlapping locks in Redis
            if (lockService.hasOverlappingLocks(roomId, bookingRequest)) {
                throw new MyException("Room is being booked for the selected date range. Please try again later.");
            }

            boolean roomLocked = lockService.acquireLock(lockKey, String.valueOf(userId), LOCK_TIME);
            log.info(roomLocked ? "Room locked: " + lockKey + " by user: " + userId : "Room not locked");

            if (!roomLocked) {
                if (lockService.isLockedBy(lockKey, String.valueOf(userId))) {
                    lockService.extendLock(lockKey, LOCK_TIME, String.valueOf(userId)); // Extend the lock time
                    res.setStatusCode(200);
                    res.setMessage("Room Freeze Extended Successfully");
                } else {
                    throw new MyException("Room is being booked for the selected date range. Please try again in 5 minutes.");
                }
            } else {
                res.setStatusCode(200);
                res.setMessage("Room Freeze Successfully");
            }
        } catch (MyException e) {
            res.setStatusCode(404);
            res.setMessage(e.getMessage());
        } catch (Exception e) {
            res.setStatusCode(500);
            res.setMessage("Something went wrong: " + e.getMessage());
        }

        return res;
    }

    @Override
    public Response saveBooking(Long roomId, Long userId, Booking bookingRequest) {
        Response response = new Response();
        String lockKey = roomId + ":" + bookingRequest.getCheckInDate() + ":" + bookingRequest.getCheckOutDate();

        try {
            log.info("Save Booking: Acquiring lock for booking: {}", lockKey);
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MyException("Room not found."));
            User user = userRepository.findById(userId).orElseThrow(() -> new MyException("User not found."));

            List<Booking> existingBookings = room.getBookings();
            if (!roomIsAvailable(bookingRequest, existingBookings)) {
                throw new MyException("Room not available for selected date range");
            }

            if (!lockService.isLockedBy(lockKey, String.valueOf(userId))) {
                throw new MyException("The room cannot be booked for the selected dates. Please try again.");
            }

            bookingRequest.setRoom(room);
            bookingRequest.setUser(user);
            String bookingConfirmationCode = Utils.generateConfirmationCode(10);
            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            Booking savedBooking = bookingRepository.save(bookingRequest);

            log.info("Booking saved successfully: {}", savedBooking.getId());
            response.setStatusCode(200);
            response.setMessage("Room Booked successfully.");
            response.setBookingConfirmationCode(bookingConfirmationCode);
            response.setBooking(Utils.mapBookingEntityToBookingDTO(savedBooking));

            // Release the lock after successfully saving the booking
            log.info("Releasing lock for booking: {}", lockKey);
            lockService.releaseLock(lockKey, String.valueOf(userId));

        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving booking: " + e.getMessage());
        }

        return response;
    }


//    @Override
//    public Response freezeBooking(Long roomId, Long userId, Booking bookingRequest) {
//        Response res = new Response();
//        String lockKey = roomId + ":" + bookingRequest.getCheckInDate() + ":" + bookingRequest.getCheckOutDate();
//
//        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
//            throw new IllegalArgumentException("Check-in date must come before checkout date");
//        }
//
//        try {
//            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MyException("Room Not Found"));
//            userRepository.findById(userId).orElseThrow(() -> new MyException("User Not Found"));
//
//            List<Booking> existingBookings = room.getBookings();
//            if (!roomIsAvailable(bookingRequest, existingBookings)) {
//                throw new MyException("Room not available for selected date range");
//            }
//
//            boolean roomLocked = lockService.acquireLock(lockKey, String.valueOf(userId), LOCK_TIME);
//            log.info(roomLocked ? "Room locked: " + lockKey + " by user: " + userId : "Room not locked");
//
//            if (!roomLocked) {
//                if (lockService.isLockedBy(lockKey, String.valueOf(userId))) {
//                    lockService.extendLock(lockKey, LOCK_TIME, String.valueOf(userId)); // Extend the lock time
//                    res.setStatusCode(200);
//                    res.setMessage("Room Freeze Extended Successfully");
//                } else {
//                    throw new MyException("Room is being booked for the selected date range. Please try again in 5 minutes.");
//                }
//            } else {
//                res.setStatusCode(200);
//                res.setMessage("Room Freeze Successfully");
//            }
//        } catch (MyException e) {
//            res.setStatusCode(404);
//            res.setMessage(e.getMessage());
//        } catch (Exception e) {
//            res.setStatusCode(500);
//            res.setMessage("Something went wrong: " + e.getMessage());
//        }
//
//        return res;
//    }
//
//    @Override
//    public Response saveBooking(Long roomId, Long userId, Booking bookingRequest) {
//        Response response = new Response();
//        String lockKey = roomId + ":" + bookingRequest.getCheckInDate() + ":" + bookingRequest.getCheckOutDate();
//
//        try {
//            log.info("Save Booking: Acquiring lock for booking: {}", lockKey);
//            Room room = roomRepository.findById(roomId).orElseThrow(() -> new MyException("Room not found."));
//            User user = userRepository.findById(userId).orElseThrow(() -> new MyException("User not found."));
//
//            List<Booking> existingBookings = room.getBookings();
//            if (!roomIsAvailable(bookingRequest, existingBookings)) {
//                throw new MyException("Room not available for selected date range");
//            }
//
//            if (!lockService.isLockedBy(lockKey, String.valueOf(userId))) {
//                throw new MyException("The room cannot be booked for the selected dates. Please try again.");
//            }
//
//            bookingRequest.setRoom(room);
//            bookingRequest.setUser(user);
//            String bookingConfirmationCode = Utils.generateConfirmationCode(10);
//            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
//            Booking savedBooking = bookingRepository.save(bookingRequest);
//
//            log.info("Booking saved successfully: {}", savedBooking.getId());
//            response.setStatusCode(200);
//            response.setMessage("Room Booked successfully.");
//            response.setBookingConfirmationCode(bookingConfirmationCode);
//            response.setBooking(Utils.mapBookingEntityToBookingDTO(savedBooking));
//
//        } catch (MyException e) {
//            response.setStatusCode(404);
//            response.setMessage(e.getMessage());
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error saving booking: " + e.getMessage());
//        }
//
//        return response;
//    }


    @Override
    public Response findBookingByConfirmationCode(String confirmationCode) {
        Response response = new Response();
        try {

            Booking booking = bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(() -> new MyException("Booking not found"));
            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTOPlusBookedRooms(booking, true);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setBooking(bookingDTO);

        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error finding booking by confirmation code : " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllBooing() {
        Response response = new Response();
        try {
            List<Booking> bookingList = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            ;
            List<BookingDTO> bookingDTOList = Utils.mapBookingEntityListToBookingDTOList(bookingList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setBookingList(bookingDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all booking : " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId) {
        Response response = new Response();
        try {
            bookingRepository.findById(bookingId).orElseThrow(() -> new MyException("Booking does not exist"));
            bookingRepository.deleteById(bookingId);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (MyException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error canceling a booking : " + e.getMessage());
        }
        return response;
    }


    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        // Exact Match
                        bookingRequest.getCheckInDate().isEqual(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckOutDate().isEqual(existingBooking.getCheckOutDate())

                                // Overlapping Start Date
                                || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())

                                // Overlapping End Date
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())

                                // Encapsulated Within
                                || bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())

                                // Encapsulating
                                || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate())
                );
    }
}
