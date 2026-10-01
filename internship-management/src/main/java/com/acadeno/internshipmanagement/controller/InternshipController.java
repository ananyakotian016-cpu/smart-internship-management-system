package com.acadeno.internshipmanagement.controller;

import com.acadeno.internshipmanagement.entity.Internship;
import com.acadeno.internshipmanagement.service.InternshipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin(origins = "http://localhost:5173")
public class InternshipController {

    private final InternshipService internshipService;

    public InternshipController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    @PostMapping
    public ResponseEntity<Internship> addInternship(
            @RequestBody Internship internship) {

        Internship savedInternship =
                internshipService.addInternship(internship);

        return new ResponseEntity<>(
                savedInternship,
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<Internship>> getAllInternships() {

        return ResponseEntity.ok(
                internshipService.getAllInternships()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Internship> getInternshipById(
            @PathVariable Long id) {

        return internshipService.getInternshipById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}