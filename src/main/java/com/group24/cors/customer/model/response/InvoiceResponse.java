package com.group24.cors.customer.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceResponse {

    private String userName;

    private String phoneNumber;

    private String email;

    private String createdDate;

    private String startDate;

    private String endDate;

    private String totalPrice;

    private Integer typeBooking;

    private String code;

    private String sumPrice;

    private String nameHomestay;

    private String addressHomestay;

    private Integer paymentMethod;

    private String addressUser;

}
