package com.carbon.entity;

import com.carbon.enums.VerificationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "project_id")
    private CarbonProject project;

    private Double verifiedReduction;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User verifiedBy;

    private LocalDateTime verificationDate;

    @Enumerated(EnumType.STRING)
    private VerificationStatus status;
}
