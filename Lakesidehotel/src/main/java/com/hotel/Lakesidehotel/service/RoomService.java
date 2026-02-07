package com.hotel.Lakesidehotel.service;

import com.hotel.Lakesidehotel.models.Room;
import com.hotel.Lakesidehotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService{
    private final RoomRepository roomRepository;

    @Override
    public Room addNewRoom(MultipartFile file, String roomtype, BigDecimal roomPrice) throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomtype);
        room.setRoomPrice(roomPrice);
        if(!file.isEmpty()){
            byte[] photobytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photobytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getRoomAllTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getallRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isEmpty()){
            throw new RuntimeException("sorry, Room Not Found!");
        }
        Blob photo = theRoom.get().getPhoto();
        if(photo!=null){
            return photo.getBytes(1,(int)photo.length());
        }
        return null;
    }

    @Override
    public void deleteroomById(Long roomid) {
        Optional<Room> room = roomRepository.findById(roomid);
        if(room.isPresent()){
            roomRepository.deleteById(roomid);
        }
    }

    @Override
    public Room updateRoom(Long roomid, String roomType, BigDecimal roomPrice, byte[] photobytes) throws SQLException {
        Room room = roomRepository.findById(roomid).orElseThrow(()->new RuntimeException("room not found"));

        if(roomType != null)room.setRoomType(roomType);
        if(roomPrice != null)room.setRoomPrice(roomPrice);
        if(photobytes != null && photobytes.length > 0 ){
            try {
                room.setPhoto(new SerialBlob(photobytes));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> findRoomById(Long roomid) {
        return Optional.of(roomRepository.findById(roomid).get());
    }

    @Override
    public List<Room> getAvailableRoom(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInDate,checkOutDate,roomType);
    }
}
