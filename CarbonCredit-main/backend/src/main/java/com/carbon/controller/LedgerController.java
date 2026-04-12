package com.carbon.controller;

import com.carbon.entity.CreditLedger;
import com.carbon.repository.CreditLedgerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ledger")
public class LedgerController {

    @Autowired
    private CreditLedgerRepository ledgerRepository;

    @GetMapping
    public List<CreditLedger> getAllLedgerEntries() {
        return ledgerRepository.findAll();
    }
}