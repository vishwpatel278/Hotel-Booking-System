package com.hotel.Lakesidehotel.controller;

import com.hotel.Lakesidehotel.models.BookedRoom;
import com.hotel.Lakesidehotel.models.Room;
import com.hotel.Lakesidehotel.response.BookedResponse;
import com.hotel.Lakesidehotel.response.RoomResponse;
import com.hotel.Lakesidehotel.service.IBookingService;
import com.hotel.Lakesidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bookings")
//@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BookingContoller {
    private final IBookingService bookingService;
    private final IRoomService roomService;

    @GetMapping("/getallBookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookedResponse>> getAllBookings(){
        List<BookedRoom> bookings = bookingService.getallBookings();
        List<BookedResponse> bookedResponses = new ArrayList<>();
        for(BookedRoom booking : bookings){
            BookedResponse response = getbookingResponse(booking);
            bookedResponses.add(response);
        }
        return ResponseEntity.ok(bookedResponses);
    }

    @GetMapping("/confirmation/{conformationcode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String conformationcode){
        try{
            BookedRoom bookingroom = bookingService.findByBookingConfirmationCode(conformationcode);
            BookedResponse response = getbookingResponse(bookingroom);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("error occured");
        }
    }

    private BookedResponse getbookingResponse(BookedRoom bookingroom) {
        Room room = roomService.findRoomById(bookingroom.getRoom().getRoomId()).get();
        RoomResponse roomResponse = new RoomResponse(room.getRoomId(),room.getRoomPrice(),room.getRoomType());
        return new BookedResponse(bookingroom.getBookingId(),bookingroom.getCheckInDate(),
                bookingroom.getCheckOutDate(),bookingroom.getGuestfullName(),
                bookingroom.getGuestEmail(),bookingroom.getNumOfAdults(),
                bookingroom.getNumOfchild(),bookingroom.getTotalNoOfGuest(),
                bookingroom.getBookingConfirmationCode(),roomResponse);
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBookings(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest){
        System.out.println(roomId);
        try{
            String confirmatiionCode = bookingService.saveBookings(roomId,bookingRequest);
            if(confirmatiionCode==null){
                throw new RuntimeException(" sorry , room is not available for the selected date");
            }
            return ResponseEntity.ok("Room Booked Succesfully , your room confirmation code is " + confirmatiionCode);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("something went wrong.....!");
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelbookings(bookingId);
    }
    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookedResponse>> getBookingByUserEmail(@PathVariable String email){
        List<BookedRoom> bookings = bookingService.getBookingsbyUserEmail(email);
        List<BookedResponse> bookedResponses = new ArrayList<>();
        for(BookedRoom booking : bookings){
            BookedResponse response = getbookingResponse(booking);
            System.out.println(response);
            bookedResponses.add(response);
        }
        return ResponseEntity.ok(bookedResponses);
    }
}
