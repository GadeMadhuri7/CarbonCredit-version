package com.carbon.entity;

import com.carbon.enums.ListingStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "credit_id")
    private CarbonCredit credit;

    private Double pricePerCredit;
    private Double listedQuantity;

    @Enumerated(EnumType.STRING)
    private ListingStatus status;

    private LocalDateTime listingDate;
}