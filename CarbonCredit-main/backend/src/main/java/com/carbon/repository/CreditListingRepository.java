package com.carbon.repository;

import com.carbon.entity.CreditListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditListingRepository extends JpaRepository<CreditListing, Long> {
}