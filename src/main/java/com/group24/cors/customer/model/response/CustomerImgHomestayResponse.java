package com.group24.cors.customer.model.response;

import com.group24.entities.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CustomerImgHomestayResponse extends IsIdentified {

    @Value("#{target.imgUrl}")
    String getImgUrl();

}
