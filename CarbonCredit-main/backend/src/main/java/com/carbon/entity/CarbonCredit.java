package com.carbon.entity;

import com.carbon.enums.CreditStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarbonCredit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "project_id")
    private CarbonProject project;

    private Double totalCredits;
    private Double availableCredits;

    @Enumerated(EnumType.STRING)
    private CreditStatus status;

    private LocalDateTime issuedDate;
}