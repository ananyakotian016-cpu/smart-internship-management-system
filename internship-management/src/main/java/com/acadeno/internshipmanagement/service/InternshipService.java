package com.acadeno.internshipmanagement.service;

import com.acadeno.internshipmanagement.entity.Internship;
import com.acadeno.internshipmanagement.entity.Student;
import com.acadeno.internshipmanagement.repository.InternshipRepository;
import com.acadeno.internshipmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InternshipService {

    private final InternshipRepository internshipRepository;
    private final StudentRepository studentRepository;

    public InternshipService(
            InternshipRepository internshipRepository,
            StudentRepository studentRepository) {

        this.internshipRepository = internshipRepository;
        this.studentRepository = studentRepository;
    }

    public Internship addInternship(Internship internship) {

        Student student = studentRepository
                .findById(internship.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        internship.setStudent(student);

        return internshipRepository.save(internship);
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public Optional<Internship> getInternshipById(Long id) {
        return internshipRepository.findById(id);
    }
}