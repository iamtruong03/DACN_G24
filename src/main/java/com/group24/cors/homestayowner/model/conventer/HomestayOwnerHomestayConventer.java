package com.group24.cors.homestayowner.model.conventer;

import com.group24.cors.homestayowner.model.request.HomestayownerHomestayRequest;
import com.group24.infrastructure.exception.rest.RestApiException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class HomestayOwnerHomestayConventer implements Converter<String, HomestayownerHomestayRequest> {
    @Override
    public HomestayownerHomestayRequest convert(String source) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(source);
            if (!jsonNode.has("name") || jsonNode.get("name").textValue().isEmpty() || jsonNode.get("name").isNull() || jsonNode.get("name").textValue().length() > 200) {
                throw new RestApiException("Trường 'name' bị trống hoặc nhiều hơn 200 kí tự");
            }
            if (!jsonNode.has("timeCheckIn") || jsonNode.get("timeCheckIn").textValue().isEmpty() || jsonNode.get("timeCheckIn").isNull()) {
                throw new RestApiException("Trường 'timeCheckIn' bị trống");
            }
            if (!jsonNode.has("timeCheckOut") || jsonNode.get("timeCheckOut").textValue().isEmpty() || jsonNode.get("timeCheckOut").isNull()) {
                throw new RestApiException("Trường 'timeCheckOut' bị trống");
            }
            if (!jsonNode.has("acreage") || jsonNode.get("acreage").isNull()) {
                throw new RestApiException("Trường 'acreage' bị trống");
            }
            if (!jsonNode.has("roomNumber") || !(jsonNode.get("roomNumber").isInt() && jsonNode.get("roomNumber").asInt() > 0) || jsonNode.get("roomNumber").isNull()) {
                throw new RestApiException("Trường 'roomNumber' bị trống");
            }
            if (!jsonNode.has("startDate") || !jsonNode.get("startDate").isLong() || jsonNode.get("startDate").isNull()) {
                throw new RestApiException("Trường 'startDate' bị trống");
            }
            if (!jsonNode.has("endDate") || !jsonNode.get("endDate").isLong() || jsonNode.get("startDate").isNull()) {
                throw new RestApiException("Trường 'endDate' bị trống");
            }
            if (!jsonNode.has("desc") || jsonNode.get("desc").textValue().isEmpty() || jsonNode.get("desc").isNull() || jsonNode.get("desc").textValue().length() > 2000) {
                throw new RestApiException("Trường 'desc' bị trống hoặc nhiều hơn 2000 kí tự");
            }
            if (!jsonNode.has("address") || jsonNode.get("address").textValue().isEmpty() || jsonNode.get("address").isNull()|| jsonNode.get("address").textValue().length() > 300) {
                throw new RestApiException("Trường 'address' bị trống hoặc nhiều hơn 300 kí tự");
            }
            if (!jsonNode.has("price") || !(jsonNode.get("price").isInt() && jsonNode.get("price").asInt() > 0) || jsonNode.get("price").isNull()) {
                throw new RestApiException("Trường 'price' bị trống");
            }
            if (!jsonNode.has("numberPerson") || !(jsonNode.get("numberPerson").isInt() && jsonNode.get("numberPerson").asInt() > 0) || jsonNode.get("numberPerson").isNull()) {
                throw new RestApiException("Trường 'numberPerson' bị trống");
            }
            if (!jsonNode.has("ownerHomestay") || jsonNode.get("ownerHomestay").textValue().isEmpty() || jsonNode.get("ownerHomestay").isNull()) {
                throw new RestApiException("Trường 'ownerHomestay' bị trống");
            }
            return objectMapper.readValue(source, HomestayownerHomestayRequest.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}




