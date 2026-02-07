package com.hotel.Lakesidehotel.service;

import com.hotel.Lakesidehotel.models.BookedRoom;

import java.util.List;

public interface IBookingService {
    String saveBookings(Long roomId, BookedRoom bookingRequest);

    void cancelbookings(Long bookingId);

    BookedRoom findByBookingConfirmationCode(String conformationcode);

    List<BookedRoom> getallBookings();

    List<BookedRoom> getBookingsbyUserEmail(String email);
}
