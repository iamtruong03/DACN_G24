package com.group24.repositories;

import com.group24.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(BookingRepository.NAME)
public interface BookingRepository extends JpaRepository<Booking, String> {
    public static final String NAME = "BaseBookingRepository";
}
