package com.hotel.Lakesidehotel.repository;

import com.hotel.Lakesidehotel.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {

    @Query(value = "SELECT DISTINCT room_type FROM room", nativeQuery = true)
    List<String> findDistinctRoomTypes();

    @Query("SELECT r from Room r where r.roomType Like %:roomType% and r.id not in (select br.room.roomId from BookedRoom br where ((br.checkInDate <= :checkOutDate) and (br.checkOutDate >= :checkInDate)))")
    List<Room> findAvailableRoomsByDatesAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
