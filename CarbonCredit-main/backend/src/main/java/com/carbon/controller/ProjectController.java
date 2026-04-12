package com.carbon.controller;

import com.carbon.entity.CarbonProject;
import com.carbon.repository.CarbonProjectRepository;
import com.carbon.repository.CarbonCreditRepository;
import com.carbon.repository.CreditTransactionRepository;
import com.carbon.service.CarbonProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private CarbonProjectService projectService;

    @Autowired
    private CarbonProjectRepository projectRepository;

    @Autowired
    private CarbonCreditRepository creditRepository;

    @Autowired
    private CreditTransactionRepository transactionRepository;

    // CREATE PROJECT
    @PostMapping("/{userId}")
    public CarbonProject createProject(@PathVariable Long userId,
                                       @RequestBody CarbonProject project) {
        return projectService.createProject(userId, project);
    }

    // GET ALL PROJECTS
    @GetMapping
    public List<CarbonProject> getAllProjects() {
        return projectRepository.findAll();
    }

    // SUMMARY API (🔥 IMPORTANT)
    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalProjects", projectRepository.count());
        data.put("totalCredits", creditRepository.count());
        data.put("totalTransactions", transactionRepository.count());

        return data;
    }
}