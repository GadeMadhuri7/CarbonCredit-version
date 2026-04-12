package com.carbon.controller;

import com.carbon.entity.CreditListing;
import com.carbon.repository.CreditListingRepository;
import com.carbon.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @Autowired
    private CreditListingRepository listingRepository;

    // CREATE LISTING
    @PostMapping
    public CreditListing createListing(@RequestParam Long creditId,
                                       @RequestParam Double quantity,
                                       @RequestParam Double price) {

        return listingService.createListing(creditId, quantity, price);
    }

    // GET ALL LISTINGS
    @GetMapping
    public List<CreditListing> getAllListings() {
        return listingRepository.findAll();
    }
}