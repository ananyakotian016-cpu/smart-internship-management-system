package com.acadeno.internshipmanagement.service;

import com.acadeno.internshipmanagement.entity.DailyReport;
import com.acadeno.internshipmanagement.entity.Student;
import com.acadeno.internshipmanagement.repository.DailyReportRepository;
import com.acadeno.internshipmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DailyReportService {

    private final DailyReportRepository dailyReportRepository;
    private final StudentRepository studentRepository;

    public DailyReportService(
            DailyReportRepository dailyReportRepository,
            StudentRepository studentRepository) {

        this.dailyReportRepository = dailyReportRepository;
        this.studentRepository = studentRepository;
    }

    public DailyReport addReport(DailyReport report) {

        Long studentId = report.getStudent().getId();

        if (dailyReportRepository.existsByStudentIdAndReportDate(
                studentId, report.getReportDate())) {

            throw new IllegalArgumentException(
                    "Student already has a report for this date"
            );
        }

        Student student = studentRepository
                .findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        report.setStudent(student);

        return dailyReportRepository.save(report);
    }

    public List<DailyReport> getAllReports() {
        return dailyReportRepository.findAll();
    }

    public List<DailyReport> getReportsByStudent(Long studentId) {
        return dailyReportRepository.findByStudentId(studentId);
    }

    public List<DailyReport> getReportsByStatus(String status) {
        return dailyReportRepository.findByStatusIgnoreCase(status);
    }
}