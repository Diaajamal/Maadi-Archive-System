package com.maadinzm.archive.department;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    public ResponseEntity<String> addDepartment(String departmentName) {
        if (isDepartmentExists(departmentName)) {
            return ResponseEntity.badRequest().body("Department already exists");
        }
        Department department = new Department();
        department.setName(departmentName);
        departmentRepository.save(department);
        return ResponseEntity.ok("Department added successfully");
    }

    public boolean isDepartmentExists(String departmentName) {
        if (departmentName == null || departmentName.isEmpty()) {
            return false;
        }
        return departmentRepository.existsById(departmentName);
    }

    @Transactional
    public void deleteDepartment(String departmentName) {
        if (!isDepartmentExists(departmentName)) {
            throw new IllegalArgumentException("Department does not exist");
        }
        try {
            departmentRepository.deleteById(departmentName);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalStateException("Cannot delete department. It is referenced by existing archives.", e);
        }
    }

    public ResponseEntity<Department> getDepartmentByName(String department) {
        if (department == null || department.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        Department departmentEntity = departmentRepository.findById(department).orElse(null);
        if (departmentEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(departmentEntity);
    }

    public List<String> getAllDepartmentNames() {
        return departmentRepository.findAll()
                .stream()
                .map(Department::getName)
                .toList();
    }
}
