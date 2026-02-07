package com.hotel.Lakesidehotel.service;

import com.hotel.Lakesidehotel.dto.LoginUserDto;
import com.hotel.Lakesidehotel.dto.LoginUsingOtpDto;
import com.hotel.Lakesidehotel.dto.RegisterUserDto;
import com.hotel.Lakesidehotel.dto.VerifyUserDto;
import com.hotel.Lakesidehotel.models.Role;
import com.hotel.Lakesidehotel.models.User;
import com.hotel.Lakesidehotel.repository.RoleRepository;
import com.hotel.Lakesidehotel.repository.UserRepository;

import jakarta.mail.MessagingException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final RoleRepository roleRepository;

    public User signup(RegisterUserDto input){
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if(optionalUser.isPresent()){
            String verificationCode = optionalUser.get().getVerificationCode();
            if(verificationCode == null){
                throw new RuntimeException("user already exists!");
            }
            else{
                optionalUser.get().setVerificationCode(generateVerificationCode());
                optionalUser.get().setVerificationCodeExpiredAt(LocalDateTime.now().plusMinutes(15));
                optionalUser.get().setEnabled(false);
                sendVerificationEmail(optionalUser.get());
                return userRepository.save(optionalUser.get());
            }
        }
        User user = new User(input.getFirstName(),input.getLastName(),input.getEmail(),passwordEncoder.encode(input.getPassword()));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiredAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        sendVerificationEmail(user);
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input){
        User user = userRepository.findByEmail(input.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.isEnabled()){
            throw new RuntimeException("Account not verified! , Please verify your account");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(),input.getPassword()));
        return user;
    }

    public void verifyUser(VerifyUserDto input){
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getVerificationCodeExpiredAt().isBefore(LocalDateTime.now())){
                throw new RuntimeException("Verification code has expired");
            }
            if(user.getVerificationCode().equals(input.getVerificationCode())){
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiredAt(null);
                userRepository.save(user);
            }else{
                throw new RuntimeException("invalid verification code!!");
            }
        }else {
            throw new RuntimeException("User not found!!!");
        }
    }

    public void resendVerificationCode(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.isEnabled()){
                throw new RuntimeException("account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiredAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        }else{
            throw new RuntimeException("User not found");
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

    private void sendVerificationEmail(User user) {
        String subject = "Account Verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try{
            emailService.sendVerificationEmail(user.getEmail(), subject,htmlMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void loginUsingOtp(String input){
        Optional<User> user = userRepository.findByEmail(input);
        System.out.println(input);
        if(!user.isPresent()){
            throw new RuntimeException("User is not available please Sign up");
        }
        user.get().setVerificationCode(generateVerificationCode());
        user.get().setVerificationCodeExpiredAt(LocalDateTime.now().plusMinutes(15));
        user.get().setEnabled(false);
        sendVerificationEmail(user.get());
        userRepository.save(user.get());
    }
}
