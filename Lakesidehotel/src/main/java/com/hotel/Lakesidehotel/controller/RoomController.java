package com.hotel.Lakesidehotel.controller;

import com.hotel.Lakesidehotel.models.BookedRoom;
import com.hotel.Lakesidehotel.models.Room;
import com.hotel.Lakesidehotel.response.BookedResponse;
import com.hotel.Lakesidehotel.response.RoomResponse;
import com.hotel.Lakesidehotel.service.BookedRoomService;
import com.hotel.Lakesidehotel.service.IRoomService;
import com.hotel.Lakesidehotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
//@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {
    private final IRoomService roomService;
    private final BookedRoomService bookedRoomService;

    @PostMapping("/add/new-room")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo")MultipartFile file,
            @RequestParam("roomType")String roomtype,
            @RequestParam("roomPrice")BigDecimal roomPrice
            ) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(file,roomtype,roomPrice);

        RoomResponse response = new RoomResponse(savedRoom.getRoomId(),savedRoom.getRoomPrice(), savedRoom.getRoomType());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/room/types")
    public List<String> getAllRoomTypes(){
        return roomService.getRoomAllTypes();
    }

    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getallRooms() throws SQLException {
        List<Room> rooms = roomService.getallRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();

        for(Room room : rooms){
            byte[] photobytes = roomService.getRoomPhotoByRoomId(room.getRoomId());
            if(photobytes != null && photobytes.length > 0){
                String base64photo = Base64.getEncoder().encodeToString(photobytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64photo);
                roomResponses.add(roomResponse);
            }
        }
        return ResponseEntity.ok(roomResponses);
    }

    private RoomResponse getRoomResponse(Room room) throws SQLException {
        List<BookedRoom> bookedRooms = getbookedRoombyroomid(room.getRoomId());
//        List<BookedResponse> bookedResponses = bookedRooms.stream().map(bookings -> new BookedResponse(bookings.getBookingId(),
//                bookings.getCheckinDate(),
//                bookings.getCheckOutDate(),
//                bookings.getBookingConfirmationCode())).toList();

        byte[] photobyte = null;
        Blob photoblob = room.getPhoto();
        if(photoblob!=null){
            try {
                photobyte = photoblob.getBytes(1, (int) photoblob.length());
            }
            catch (Exception e){
                throw new RuntimeException("errro retriving photo");
            }
        }
        return new RoomResponse(room.getRoomId(),room.getRoomPrice(),room.getRoomType(),room.isIsbooked(),photobyte);
    }

    private List<BookedRoom> getbookedRoombyroomid(Long roomId) {
        return bookedRoomService.findbookedRoombyroomid(roomId);
    }

    @DeleteMapping("/delete/{roomid}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteroomById(@PathVariable Long roomid){
        roomService.deleteroomById(roomid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update-room/{roomid}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> updateRoomById(@PathVariable Long roomid,
                                                       @RequestParam(required = false) String roomType,
                                                       @RequestParam(required = false) BigDecimal roomPrice,
                                                       @RequestParam(required = false) MultipartFile photo) throws SQLException, IOException {
        byte[] photobytes = photo != null && !photo.isEmpty() ? photo.getBytes() : roomService.getRoomPhotoByRoomId(roomid);
        Blob photoblob = photobytes != null && photobytes.length > 0 ? new SerialBlob(photobytes) : null ;
        Room room = roomService.updateRoom(roomid,roomType,roomPrice,photobytes);
        room.setPhoto(photoblob);
        RoomResponse roomResponse = getRoomResponse(room);
        return ResponseEntity.ok(roomResponse);
    }

    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomResponse>> getAvailableRoom(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
                                                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
                                                       @RequestParam String roomType) throws SQLException {
        List<Room> availableroom = roomService.getAvailableRoom(checkInDate,checkOutDate,roomType);
        List<RoomResponse> roomResponses = new ArrayList<>();
        for(Room room : availableroom){
            RoomResponse response = getRoomResponse(room);
            roomResponses.add(response);
        }
        if(roomResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(roomResponses);
    }

    @GetMapping("/room/{roomid}")
    public ResponseEntity<Optional<RoomResponse>> findRoomById(@PathVariable Long roomid){
        Optional<Room> theRoom = roomService.findRoomById(roomid);
        return theRoom.map(room -> {
            RoomResponse response = null;
            try {
                response = getRoomResponse(room);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            return ResponseEntity.ok(Optional.of(response));
        }).orElseThrow(() -> new RuntimeException("room not found"));
    }
}