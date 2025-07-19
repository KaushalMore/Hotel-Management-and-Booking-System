package com.hotel.hotelmore.service.intefaces;

import com.hotel.hotelmore.dto.LoginRequest;
import com.hotel.hotelmore.dto.Response;
import com.hotel.hotelmore.entity.User;

public interface UserService {

    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
