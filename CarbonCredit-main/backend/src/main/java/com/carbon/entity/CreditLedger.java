
package com.carbon.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditLedger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "credit_id")
    private CarbonCredit credit;

    private String transactionType; // ISSUED, PURCHASED

    private Double quantity;
    private Double balanceAfter;

    private LocalDateTime transactionDate;
}