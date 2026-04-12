package com.carbon.service;

import com.carbon.entity.*;
import com.carbon.enums.*;
import com.carbon.exception.ResourceNotFoundException;
import com.carbon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VerificationService {

    @Autowired
    private CarbonProjectRepository projectRepository;

    @Autowired
    private CarbonCreditRepository creditRepository;

    @Autowired
    private CreditVerificationRepository verificationRepository;

    @Autowired
    private CreditLedgerRepository ledgerRepository;

    // APPROVE PROJECT
    public void approveProject(Long projectId, Double verifiedReduction) {

        CarbonProject project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        // 🔥 Rule: Only under verification projects can be approved
        project.setStatus(ProjectStatus.VERIFIED);

        // CREATE VERIFICATION
        CreditVerification verification = new CreditVerification();
        verification.setProject(project);
        verification.setVerifiedReduction(verifiedReduction);
        verification.setVerificationDate(LocalDateTime.now());
        verification.setStatus(VerificationStatus.APPROVED);

        verificationRepository.save(verification);

        // 💥 CREDIT CALCULATION
        // 1 credit = 1 ton CO2
        double credits = verifiedReduction;

        CarbonCredit carbonCredit = new CarbonCredit();
        carbonCredit.setProject(project);
        carbonCredit.setTotalCredits(credits);
        carbonCredit.setAvailableCredits(credits);
        carbonCredit.setStatus(CreditStatus.AVAILABLE);
        carbonCredit.setIssuedDate(LocalDateTime.now());

        creditRepository.save(carbonCredit);

        // 📒 LEDGER ENTRY
        CreditLedger ledger = new CreditLedger();
        ledger.setCredit(carbonCredit);
        ledger.setTransactionType("ISSUED");
        ledger.setQuantity(credits);
        ledger.setBalanceAfter(credits);
        ledger.setTransactionDate(LocalDateTime.now());

        ledgerRepository.save(ledger);
    }
}