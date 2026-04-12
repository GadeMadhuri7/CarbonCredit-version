package com.carbon.service;

import com.carbon.entity.*;
import com.carbon.enums.*;
import com.carbon.exception.ResourceNotFoundException;
import com.carbon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ListingService {

    @Autowired
    private CarbonCreditRepository creditRepository;

    @Autowired
    private CreditListingRepository listingRepository;

    public CreditListing createListing(Long creditId, Double quantity, Double price) {

        CarbonCredit credit = creditRepository.findById(creditId)
                .orElseThrow(() -> new ResourceNotFoundException("Credit not found"));

        if (quantity > credit.getAvailableCredits()) {
            throw new RuntimeException("Cannot list more than available credits");
        }

        CreditListing listing = new CreditListing();
        listing.setCredit(credit);
        listing.setListedQuantity(quantity);
        listing.setPricePerCredit(price);
        listing.setStatus(ListingStatus.ACTIVE);
        listing.setListingDate(LocalDateTime.now());

        return listingRepository.save(listing);
    }
}