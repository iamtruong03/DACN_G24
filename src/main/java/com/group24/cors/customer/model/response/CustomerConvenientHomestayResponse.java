package com.group24.cors.customer.model.response;

import com.group24.entities.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface CustomerConvenientHomestayResponse extends IsIdentified {

    @Value("#{target.convenient_name}")
    String getConvenient_Name();

    @Value("#{target.convenient_type_name}")
    String getConvenient_Type_Name();

}
