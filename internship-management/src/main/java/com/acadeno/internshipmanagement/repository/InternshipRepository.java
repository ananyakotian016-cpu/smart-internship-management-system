package com.acadeno.internshipmanagement.repository;

import com.acadeno.internshipmanagement.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
}