package com.group24.cors.homestayowner.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.*;

@Getter
@Setter
public class HomestayOwnerBookingRequest extends PageableRequest {

    String idOwner;

    String userName;

    String homestayName;

    String sdtUser;

    String nameBooking;

    Integer statusBooking;

    Integer month;

    Integer year;

}
