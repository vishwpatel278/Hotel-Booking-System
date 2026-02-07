package com.hotel.Lakesidehotel.service;

import com.hotel.Lakesidehotel.models.Room;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IRoomService {
    Room addNewRoom(MultipartFile file, String roomtype, BigDecimal roomPrice) throws SQLException, IOException;

    List<String> getRoomAllTypes();

    List<Room> getallRooms();

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException;

    void deleteroomById(Long roomid);

    Room updateRoom(Long roomid, String roomType, BigDecimal roomPrice, byte[] photobytes) throws SQLException;

    Optional<Room> findRoomById(Long roomid);

    List<Room> getAvailableRoom(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
