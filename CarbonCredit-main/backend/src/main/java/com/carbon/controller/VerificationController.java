package com.carbon.controller;

import com.carbon.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/verifications")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @PostMapping("/approve")
    public String approveProject(@RequestParam Long projectId,
                                 @RequestParam Double reduction) {

        verificationService.approveProject(projectId, reduction);
        return "Project verified and credits issued";
    }
}