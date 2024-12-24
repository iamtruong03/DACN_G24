package com.group24.cors.customer.model.coventer;

import com.group24.cors.customer.model.request.CustomerRequest;
import com.group24.cors.homestayowner.model.request.loginrequest.HomestayOwnerOwnerHomestayRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomerConventer implements Converter<String, CustomerRequest> {
    @Override
    public CustomerRequest convert(String source) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(source);
            return objectMapper.readValue(source, CustomerRequest.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
