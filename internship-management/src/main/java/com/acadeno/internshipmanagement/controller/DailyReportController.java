package com.acadeno.internshipmanagement.controller;

import com.acadeno.internshipmanagement.entity.DailyReport;
import com.acadeno.internshipmanagement.service.DailyReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class DailyReportController {

    private final DailyReportService dailyReportService;

    public DailyReportController(DailyReportService dailyReportService) {
        this.dailyReportService = dailyReportService;
    }

    @PostMapping
    public ResponseEntity<DailyReport> addReport(
            @RequestBody DailyReport report) {

        DailyReport savedReport =
                dailyReportService.addReport(report);

        return new ResponseEntity<>(
                savedReport,
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<DailyReport>> getAllReports() {
        return ResponseEntity.ok(
                dailyReportService.getAllReports()
        );
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<DailyReport>> getReportsByStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                dailyReportService.getReportsByStudent(studentId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<DailyReport>> getReportsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                dailyReportService.getReportsByStatus(status)
        );
    }
}