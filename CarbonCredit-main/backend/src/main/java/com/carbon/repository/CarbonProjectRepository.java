package com.carbon.repository;

import com.carbon.entity.CarbonProject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarbonProjectRepository extends JpaRepository<CarbonProject, Long> {
}