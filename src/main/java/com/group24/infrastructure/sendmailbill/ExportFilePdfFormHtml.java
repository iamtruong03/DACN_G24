package com.group24.infrastructure.sendmailbill;

import com.group24.cors.customer.model.response.CustomerBillBookingResponse;
import com.group24.cors.customer.model.response.InvoiceResponse;
import com.group24.cors.customer.repository.CustomerBookingRepository;
import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.Map;

@Component
public class ExportFilePdfFormHtml {

    @Autowired
    private CustomerBookingRepository customerBookingRepository;
    @Autowired
    private ServletContext servletContext;

    public Context setData(InvoiceResponse invoice) {

        Context context = new Context();

        Map<String, Object> data = new HashMap<>();

        data.put("invoice", invoice);

        context.setVariables(data);

        return context;
    }

    public Context setDataSendMail(InvoiceResponse invoice, String url) {

        Context context = new Context();

        Map<String, Object> data = new HashMap<>();

        data.put("invoice", invoice);
        data.put("url", url);
        context.setVariables(data);

        return context;
    }

    public InvoiceResponse getInvoiceResponse(String bookingId) {
        CustomerBillBookingResponse billBookingResponse = customerBookingRepository.getOneBooking(bookingId);
        InvoiceResponse invoiceResponse = InvoiceResponse.builder()
                .addressHomestay(billBookingResponse.getAddressHomestay())
                .nameHomestay(billBookingResponse.getNameHomestay())
                .email(billBookingResponse.getEmail())
                .code(billBookingResponse.getCode())
                .createdDate(billBookingResponse.getCreatedDate())
                .endDate(billBookingResponse.getEndDate())
                .phoneNumber(billBookingResponse.getPhoneNumber())
                .startDate(billBookingResponse.getStartDate())
                .sumPrice(billBookingResponse.getSumPrice())
                .totalPrice(billBookingResponse.getTotalPrice())
                .typeBooking(billBookingResponse.getTypeBooking())
                .userName(billBookingResponse.getUser_Name())
                .paymentMethod(billBookingResponse.getPaymentMethod())
                .addressUser(billBookingResponse.getAddressUser())
                .build();
        return invoiceResponse;
    }
}
