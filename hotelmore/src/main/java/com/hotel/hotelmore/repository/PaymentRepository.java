package com.hotel.hotelmore.repository;

import com.hotel.hotelmore.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
