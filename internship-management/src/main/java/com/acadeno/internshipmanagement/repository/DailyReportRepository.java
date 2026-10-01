package com.acadeno.internshipmanagement.repository;

import com.acadeno.internshipmanagement.entity.DailyReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyReportRepository extends JpaRepository<DailyReport, Long> {

    List<DailyReport> findByStudentId(Long studentId);

    List<DailyReport> findByStatusIgnoreCase(String status);

    boolean existsByStudentIdAndReportDate(
            Long studentId,
            LocalDate reportDate
    );
}