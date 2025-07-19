package com.hotel.hotelmore.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @NotNull
    private Long userId;

    @NotNull
    private String paymentId;

    private String paymentStatus;

    private String createTime;

    private String updateTime;

    private String payerId;

    private String payerEmail;

    private String payerFirstName;

    private String payerLastName;

    private String referenceId;

    private String amount;

    private String currency;

    private String payeeEmail;

}
