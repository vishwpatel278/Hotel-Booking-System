package com.hotel.Lakesidehotel.security.jwt;

import com.hotel.Lakesidehotel.security.user.HotelUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@Component
public class jwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(jwtUtils.class);

    @Value("${auth.token.secret}")
    private String jwtSecret;

    @Value("${auth.token.expirationTime}")
    private Long jwtExpirationTime;

    public String generateJwtTokenForUser(Authentication authentication){
        HotelUserDetails userPrincipal = (HotelUserDetails) authentication.getPrincipal();
        List<String> roles = userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        return Jwts.builder().setSubject(userPrincipal.getUsername())
                .claim("roles",roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime()+jwtExpirationTime))
                .signWith(key() , SignatureAlgorithm.HS256).compact();
    }

    private SecretKey key() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String getUserNameFromToken(String token){
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
            return true;
        }catch(MalformedJwtException e){
            logger.error("invalid jwt Token" + e.getMessage());
        }catch (ExpiredJwtException e){
            logger.error("Expired Token : " + e.getMessage());
        }catch (UnsupportedJwtException e){
            logger.error("This Token is not supported: " + e.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("no claims found!");
        }
        return false;
    }
}
