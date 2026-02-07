package com.hotel.Lakesidehotel.service;

import com.hotel.Lakesidehotel.models.BookedRoom;
import com.hotel.Lakesidehotel.models.Room;
import com.hotel.Lakesidehotel.repository.BookingRepository;
import com.hotel.Lakesidehotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomService implements IBookingService{
    private final BookingRepository bookingRepository;
    private final IRoomService roomService;

    public List<BookedRoom> findbookedRoombyroomid(Long roomId) {
        return bookingRepository.findByRoomRoomId(roomId);
    }

    @Override
    public String saveBookings(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new RuntimeException("check out date must come after check in date");
        }

        Room room = roomService.findRoomById(roomId).get();
        List<BookedRoom> bookings = room.getBookings();
        if(isAvilableroom(bookings,bookingRequest)){
            room.addBookings(bookingRequest);
            bookingRequest.CalculateTotalNoOfGuest();
            bookingRepository.save(bookingRequest);
            return bookingRequest.getBookingConfirmationCode();
        }
        return null;
    }

    private boolean isAvilableroom(List<BookedRoom> bookings, BookedRoom bookingRequest) {
        return bookings.stream().noneMatch(booking ->
                bookingRequest.getCheckInDate().equals(booking.getCheckInDate())
                || bookingRequest.getCheckInDate().isBefore(booking.getCheckOutDate())
                || (bookingRequest.getCheckInDate().isAfter(booking.getCheckInDate())
                && bookingRequest.getCheckInDate().isBefore(booking.getCheckOutDate()))

                || (bookingRequest.getCheckInDate().isBefore(booking.getCheckInDate())
                && bookingRequest.getCheckOutDate().equals(booking.getCheckOutDate()))

                || (bookingRequest.getCheckInDate().isBefore(booking.getCheckInDate())
                && bookingRequest.getCheckOutDate().isAfter(booking.getCheckOutDate()))

                || (bookingRequest.getCheckInDate().equals(booking.getCheckOutDate())
                && bookingRequest.getCheckOutDate().equals(booking.getCheckInDate()))

                || (bookingRequest.getCheckInDate().equals(booking.getCheckOutDate())
                && bookingRequest.getCheckOutDate().equals(booking.getCheckInDate())));
    }


    @Override
    public void cancelbookings(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String BookingConfirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(BookingConfirmationCode).orElseThrow(() -> new RuntimeException("No Booking Found with Booking Code : " + BookingConfirmationCode));
    }

    @Override
    public List<BookedRoom> getallBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedRoom> getBookingsbyUserEmail(String email) {
        List<BookedRoom> list = bookingRepository.findByGuestEmail(email);
        return list;
    }
}
