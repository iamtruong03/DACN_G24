package com.group24.cors.customer.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerVNPayRequest {

    public String vnp_Ammount;

    public String vnp_OrderInfo;

    public String vnp_OrderType = "Thanh toan hoa don";
    
}
