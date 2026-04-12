package com.carbon.repository;

import com.carbon.entity.CreditVerification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditVerificationRepository extends JpaRepository<CreditVerification, Long> {
}