package com.hotel.Lakesidehotel.response;

import com.hotel.Lakesidehotel.models.Room;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookedResponse {
    private Long bookingId;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private String guestfullName;

    private String guestEmail;

    private int numOfAdults;

    private int numOfchild;

    private int totalNoOfGuest;

    private String BookingConfirmationCode;

    private RoomResponse room;

    public BookedResponse(Long bookingId, LocalDate checkinDate,LocalDate checkOutDate, String bookingConfirmationCode) {
        this.checkOutDate = checkOutDate;
        this.bookingId = bookingId;
        this.checkInDate = checkinDate;
        this.BookingConfirmationCode = bookingConfirmationCode;
    }

//    public BookedResponse(Long bookingId, LocalDate checkinDate, LocalDate checkOutDate, String guestfullName, String guestEmail, int numOfAdults, int numOfchild, int totalNoOfGuest, String bookingConfirmationCode, RoomResponse room) {
//        this.bookingId = bookingId;
//        this.checkinDate = checkinDate;
//        this.checkOutDate = checkOutDate;
//        this.guestfullName = guestfullName;
//        this.guestEmail = guestEmail;
//        this.numOfAdults = numOfAdults;
//        this.numOfchild = numOfchild;
//        this.totalNoOfGuest = totalNoOfGuest;
//        this.BookingConfirmationCode = bookingConfirmationCode;
//        this.room = room;
//    }
}
