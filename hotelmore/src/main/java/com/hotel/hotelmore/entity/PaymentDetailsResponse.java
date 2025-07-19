package com.hotel.hotelmore.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetailsResponse {

    private String paymentId;
    private String paymentStatus;
    private String createTime;
    private String updateTime;
    private String payerEmail;
    private String payerFirstName;
    private String payerLastName;
    private String amount;
    private String currency;
}
