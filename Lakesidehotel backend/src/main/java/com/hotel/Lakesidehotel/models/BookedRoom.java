package com.hotel.Lakesidehotel.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "check_in")
    private LocalDate checkInDate;

    @Column(name = "check_out")
    private LocalDate checkOutDate;

    @Column(name = "guest_fullname")
    private String guestfullName;

    private String guestEmail;

    @Column(name = "adults")
    private Integer numOfAdults;

    @Column(name = "children")
    private Integer numOfchild;

    @Column(name = "total_guest")
    private Integer totalNoOfGuest;

    @Column(name = "confirmation_code")
    private String bookingConfirmationCode;

    @JoinColumn(name = "room_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;

    public void CalculateTotalNoOfGuest(){
        this.totalNoOfGuest = this.numOfAdults + this.numOfchild;
    }

    public void setNumOfchild(Integer numOfchild) {
        this.numOfchild = numOfchild;
        CalculateTotalNoOfGuest();
    }

    public void setNumOfAdults(Integer numOfAdults) {
        this.numOfAdults = numOfAdults;
        CalculateTotalNoOfGuest();
    }

}
