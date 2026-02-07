package com.hotel.Lakesidehotel.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUsingOtpDto {
    private String email;
    private String verificationCode;
}
