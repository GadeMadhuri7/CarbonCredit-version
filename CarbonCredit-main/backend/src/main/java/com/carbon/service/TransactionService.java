package com.carbon.service;

import com.carbon.entity.*;
import com.carbon.enums.*;
import com.carbon.exception.ResourceNotFoundException;
import com.carbon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TransactionService {

    @Autowired
    private CreditListingRepository listingRepository;

    @Autowired
    private CreditTransactionRepository transactionRepository;

    @Autowired
    private CarbonCreditRepository creditRepository;

    @Autowired
    private CreditLedgerRepository ledgerRepository;

    @Autowired
    private UserRepository userRepository;

    public CreditTransaction purchaseCredits(Long buyerId, Long listingId, Double quantity) {

        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new ResourceNotFoundException("Buyer not found"));

        CreditListing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        CarbonCredit credit = listing.getCredit();

        // RULE: Cannot buy more than available
        if (quantity > listing.getListedQuantity()) {
            throw new RuntimeException("Not enough credits in listing");
        }

        // Calculate price
        Double totalPrice = quantity * listing.getPricePerCredit();

        // Update listing
        listing.setListedQuantity(listing.getListedQuantity() - quantity);
        if (listing.getListedQuantity() == 0) {
            listing.setStatus(ListingStatus.CLOSED);
        }

        // Update credit balance
        credit.setAvailableCredits(credit.getAvailableCredits() - quantity);

        if (credit.getAvailableCredits() == 0) {
            credit.setStatus(CreditStatus.SOLD);
        } else {
            credit.setStatus(CreditStatus.PARTIALLY_SOLD);
        }

        // Save transaction
        CreditTransaction transaction = new CreditTransaction();
        transaction.setBuyer(buyer);
        transaction.setListing(listing);
        transaction.setQuantity(quantity);
        transaction.setTotalPrice(totalPrice);
        transaction.setStatus(TransactionStatus.SUCCESS);
        transaction.setTransactionDate(LocalDateTime.now());

        transactionRepository.save(transaction);

        // Ledger update
        CreditLedger ledger = new CreditLedger();
        ledger.setCredit(credit);
        ledger.setTransactionType("PURCHASED");
        ledger.setQuantity(quantity);
        ledger.setBalanceAfter(credit.getAvailableCredits());
        ledger.setTransactionDate(LocalDateTime.now());

        ledgerRepository.save(ledger);

        return transaction;
    }
}