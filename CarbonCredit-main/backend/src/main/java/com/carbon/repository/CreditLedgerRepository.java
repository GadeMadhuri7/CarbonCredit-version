package com.carbon.repository;

import com.carbon.entity.CreditLedger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditLedgerRepository extends JpaRepository<CreditLedger, Long> {
}