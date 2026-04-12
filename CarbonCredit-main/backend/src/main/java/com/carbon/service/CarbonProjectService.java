package com.carbon.service;

import com.carbon.entity.CarbonProject;
import com.carbon.entity.User;
import com.carbon.enums.ProjectStatus;
import com.carbon.exception.ResourceNotFoundException;
import com.carbon.repository.CarbonProjectRepository;
import com.carbon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarbonProjectService {

    @Autowired
    private CarbonProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE PROJECT
    public CarbonProject createProject(Long userId, CarbonProject project) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        project.setCreatedBy(user);
        project.setStatus(ProjectStatus.CREATED);

        return projectRepository.save(project);
    }
}