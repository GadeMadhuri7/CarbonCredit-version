package com.carbon.repository;

import com.carbon.entity.CarbonCredit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarbonCreditRepository extends JpaRepository<CarbonCredit, Long> {
}