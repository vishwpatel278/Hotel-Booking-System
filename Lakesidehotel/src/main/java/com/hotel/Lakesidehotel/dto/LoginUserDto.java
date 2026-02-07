package com.hotel.Lakesidehotel.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class LoginUserDto {
    private String email;
    private String password;
}
