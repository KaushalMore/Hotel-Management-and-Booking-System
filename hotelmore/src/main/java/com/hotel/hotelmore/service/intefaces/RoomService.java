package com.hotel.hotelmore.service.intefaces;

import com.hotel.hotelmore.dto.Response;
import com.hotel.hotelmore.entity.Room;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface RoomService {

    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDescription);

    List<String> getAllRoomTypes();

    Response getAllRooms();

    Response deleteRoom(Long roomId);

    Response updateRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDescription);

    Response getRoomById(Long roomId);

    Response getAvailableRoomsByDateAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    Response getAvailableRooms();
}
