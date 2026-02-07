package com.hotel.Lakesidehotel.controller;

import com.hotel.Lakesidehotel.dto.LoginUserDto;
import com.hotel.Lakesidehotel.dto.LoginUsingOtpDto;
import com.hotel.Lakesidehotel.dto.RegisterUserDto;
import com.hotel.Lakesidehotel.dto.VerifyUserDto;
import com.hotel.Lakesidehotel.models.Role;
import com.hotel.Lakesidehotel.models.User;
import com.hotel.Lakesidehotel.repository.UserRepository;
import com.hotel.Lakesidehotel.request.LoginRequest;
import com.hotel.Lakesidehotel.response.JwtResponse;
import com.hotel.Lakesidehotel.security.jwt.jwtUtils;
import com.hotel.Lakesidehotel.security.user.HotelUserDetails;
import com.hotel.Lakesidehotel.service.AuthenticationService;
import com.hotel.Lakesidehotel.service.IUserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
@Data
@CrossOrigin(value = "http://localhost:5173",allowCredentials = "true")
public class AuthController {
    private final IUserService userService;

    private final AuthenticationManager authenticationManager;

    private final jwtUtils utils;

    private final AuthenticationService authenticationService;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDto user){
        try{
            System.out.println(user.getEmail());
            System.out.println(user.getFirstName());
            System.out.println(user.getLastName());
            authenticationService.signup(user);
            return ResponseEntity.ok("Registration Successful");
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = utils.generateJwtTokenForUser(authentication);
        HotelUserDetails userDetails = (HotelUserDetails) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(new JwtResponse(
                userDetails.getUserId(),
                userDetails.getEmail(),
                jwt,
                roles
        ));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto){
        try{
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account Verified Successfully");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email){
        try{
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/sendOtp-to-login")
    public ResponseEntity<String> loginUsingOtp(@RequestParam String email){
        try{
            authenticationService.loginUsingOtp(email);
            return ResponseEntity.ok("verification successful");
        }catch (Exception e){
            throw new RuntimeException("something went wrong!");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody LoginUserDto input){
        String newpass = passwordEncoder.encode(input.getPassword());
        System.out.println(newpass);
        System.out.println(input.getEmail());
        Optional<User> user = userRepository.findByEmail(input.getEmail());
        user.get().setPassword(newpass);
        System.out.println(user.get().getRoles());
        userRepository.save(user.get());
        return ResponseEntity.ok("Password updated succesfully");
    }
}
