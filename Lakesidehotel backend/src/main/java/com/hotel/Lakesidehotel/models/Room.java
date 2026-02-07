package com.hotel.Lakesidehotel.models;

import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@Getter
@Setter
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;
    private BigDecimal roomPrice;
    private String roomType;
    private boolean isbooked = false;

    @Lob
    private Blob photo;

    @OneToMany(mappedBy = "room" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;

    public Room() {
        bookings = new ArrayList<>();
    }

    public void addBookings(BookedRoom booking){
        if(bookings==null){
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setRoom(this);
        isbooked = true;
        String bookingcode = RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingcode);
    }
}
