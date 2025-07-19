package com.hotel.hotelmore.repository;

import com.hotel.hotelmore.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    boolean existsById(Long bookingId);

    Optional<Booking> findByBookingConfirmationCode(String bookingConfirmationCode);

}
