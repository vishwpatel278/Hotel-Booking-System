package com.hotel.Lakesidehotel.service;

import com.hotel.Lakesidehotel.models.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);

    List<User> getUsers();

    void deleteUser(String email);

    User getUser(String email);

}
