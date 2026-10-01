package com.acadeno.internshipmanagement.service;

import com.acadeno.internshipmanagement.entity.Student;
import com.acadeno.internshipmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Optional<Student> updateStudent(Long id, Student updatedStudent) {

    return studentRepository.findById(id).map(student -> {

        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        student.setPhone(updatedStudent.getPhone());
        student.setCollege(updatedStudent.getCollege());

        return studentRepository.save(student);
    });
    }
    public List<Student> searchStudents(String name) {
    return studentRepository.findByNameContainingIgnoreCase(name);
    }
}