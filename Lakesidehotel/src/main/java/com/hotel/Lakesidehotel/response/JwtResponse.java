package com.hotel.Lakesidehotel.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JwtResponse {
    private Long userId;

    private String email;

    private String token;

    private String type = "Bearer";

    private List<String> roles;

    public JwtResponse(Long userId, String email, String token, List<String> roles) {
        this.userId = userId;
        this.email = email;
        this.token = token;
        this.roles = roles;
    }
}
