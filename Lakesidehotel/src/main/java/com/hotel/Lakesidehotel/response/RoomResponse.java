package com.hotel.Lakesidehotel.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {
    private Long roomId;
    private BigDecimal roomPrice;
    private String roomType;
    private boolean isbooked = false;
    private String photo;
    private List<BookedResponse> bookings;

    public RoomResponse(Long roomId, BigDecimal roomPrice, String roomType) {
        this.roomId = roomId;
        this.roomPrice = roomPrice;
        this.roomType = roomType;
    }

    public RoomResponse(Long roomId, BigDecimal roomPrice, String roomType, boolean isbooked,byte[] photobyte) {
        this.roomId = roomId;
        this.roomPrice = roomPrice;
        this.roomType = roomType;
        this.isbooked = isbooked;
        this.photo = photobyte != null ? Base64.getEncoder().encodeToString(photobyte) : null;
//        this.bookings = bookings;
    }
}
