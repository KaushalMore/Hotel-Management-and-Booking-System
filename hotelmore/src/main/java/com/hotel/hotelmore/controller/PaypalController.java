package com.hotel.hotelmore.controller;

import com.hotel.hotelmore.entity.PaymentDetailsResponse;
import com.hotel.hotelmore.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PaypalController {

    private final PaypalService paypalService;

    @PostMapping("/payment/create")
    public ResponseEntity<String> createPayment(
            @RequestParam("amount") String amount
    ) throws PayPalRESTException {
        try {
            String cancelUrl = "http://localhost:3000/payment/cancel";
            String successUrl = "http://localhost:3000/payment/success";
            Payment payment = paypalService.createPayment(
                    Double.parseDouble(amount),
                    "USD",
                    "Paypal",
                    "sale",
                    "Payment description",
                    cancelUrl,
                    successUrl);
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return ResponseEntity.ok(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(500).body("Payment error");
        }
        return ResponseEntity.status(500).body("Payment error");
    }

    @GetMapping("/payment/success")
    public ResponseEntity<?> paymentSuccess(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        log.info("Received paymentId: {}, PayerID: {}", paymentId, payerId);
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            log.info("Payment: {}", payment.getState().toString());
            if (payment.getState().equals("approved")) {
                return ResponseEntity.ok(new PaymentDetailsResponse(
                        payment.getId(),
                        payment.getState(),
                        payment.getCreateTime(),
                        payment.getUpdateTime(),
                        payment.getPayer().getPayerInfo().getEmail(),
                        payment.getPayer().getPayerInfo().getFirstName(),
                        payment.getPayer().getPayerInfo().getLastName(),
                        payment.getTransactions().get(0).getAmount().getTotal(),
                        payment.getTransactions().get(0).getAmount().getCurrency()));
            } else {
                log.error("Payment not approved, state: {}", payment.getState());
            }
        } catch (PayPalRESTException e) {
            log.error("PayPalRESTException: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        } catch (Exception e) {
            log.error("Exception: {}", e.getMessage());
            return ResponseEntity.status(500).body("Internal Server Error");
        }
        return ResponseEntity.status(500).body("Payment error");
    }

}