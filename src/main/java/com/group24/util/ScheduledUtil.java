package com.group24.util;

import com.group24.cors.admin.repository.AdminHomestayRepository;
import com.group24.cors.customer.repository.CustomerBookingRepository;
import com.group24.cors.customer.repository.CustomerCartDetailRepository;
import com.group24.entities.Booking;
import com.group24.entities.CartDetail;
import com.group24.entities.Homestay;
import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.StatusBooking;
import com.group24.infrastructure.contant.StatusCart;
import com.group24.infrastructure.contant.StatusPayOwner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class ScheduledUtil {

    @Autowired
    private CustomerCartDetailRepository customerCartDetailRepository;
    @Autowired
    private CustomerBookingRepository customerBookingRepository;
    @Autowired
    private AdminHomestayRepository adminHomestayRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void scheduledCheckStatusCart() {
        List<CartDetail> cartDetailList = customerCartDetailRepository.getAllCartDetail();
        Long currentTime = DateUtils.truncDate(new Date()).getTime();
        for (CartDetail cartDetail : cartDetailList) {
            if (cartDetail.getEndDate() < currentTime) {
                cartDetail.setStatus(StatusCart.KHONG_HOAT_DONG);
                customerCartDetailRepository.save(cartDetail);
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void scheduledDeleteBooking() {
        List<Booking> bookingList = customerBookingRepository.getAllBooking();
        Long currentTime = DateUtils.truncDate(new Date()).getTime();
        for (Booking booking : bookingList) {
            if (booking.getStatus() == StatusBooking.CHO_THANH_TOAN &&
                    DateUtils.getDaysBetweenDates(booking.getCreatedDate(), currentTime) >= 2) {
                customerBookingRepository.delete(booking);
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void scheduledChangeStatusHomestay() {
        List<Homestay> listHomestays = adminHomestayRepository.getAllHomsestayByAdmin();
        Long currentTime = DateUtils.truncDate(new Date()).getTime();
        for (Homestay homestay : listHomestays) {
            if (homestay.getEndDate() < currentTime) {
                homestay.setStatus(Status.KHONG_HOAT_DONG);
                adminHomestayRepository.save(homestay);
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void scheduleCheckStatusBooking() {
        List<Booking> bookingList = customerBookingRepository.getAllBookingSuccess();
        if (!bookingList.isEmpty()) {
            for (Booking booking : bookingList) {
                if (booking.getEndDate() <= DateUtils.truncDate(new Date()).getTime()) {
                    booking.setStatus(StatusBooking.DA_THUE_XONG);
                    booking.setStatusPayOwner(StatusPayOwner.CHUA_TT_CHO_OWNER);
                    customerBookingRepository.save(booking);
                }
            }
        }
    }

}
