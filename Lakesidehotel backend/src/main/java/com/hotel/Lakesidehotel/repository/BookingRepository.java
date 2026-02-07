package com.hotel.Lakesidehotel.repository;

import com.hotel.Lakesidehotel.models.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookedRoom ,Long> {
    List<BookedRoom> findByRoomRoomId(Long roomId);

    Optional<BookedRoom> findByBookingConfirmationCode(String bookingConfirmationCode);

    List<BookedRoom> findByGuestEmail(String email);
}
