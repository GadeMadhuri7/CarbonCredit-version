package com.carbon.controller;

import com.carbon.entity.CreditTransaction;
import com.carbon.repository.CreditTransactionRepository;
import com.carbon.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private CreditTransactionRepository transactionRepository;

    // BUY CREDITS
    @PostMapping("/buy")
    public CreditTransaction buyCredits(@RequestParam Long buyerId,
                                        @RequestParam Long listingId,
                                        @RequestParam Double quantity) {

        return transactionService.purchaseCredits(buyerId, listingId, quantity);
    }

    // GET ALL TRANSACTIONS
    @GetMapping
    public List<CreditTransaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}