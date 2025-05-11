package com.maadinzm.archive.department;

import com.maadinzm.archive.dtos.DepartmentRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/department")
@RequiredArgsConstructor
@Tag(name= "Department", description = "Department management operations")
public class DepartmentController {
    private final DepartmentService departmentService;
    private final Logger logger = LogManager.getLogger(DepartmentController.class);

    // Add methods for handling department-related requests here
    // For example, you can add methods to create, update, delete, and retrieve departments

    @Operation(summary = "Add a new department")
    @PostMapping("/add")
    public ResponseEntity<String> addDepartment(
            @RequestParam String departmentName,
            @RequestParam(defaultValue = "false") boolean isInternal) {
        logger.info("Adding department {} with isInternal={}", departmentName, isInternal);
        if (departmentName == null || departmentName.isEmpty()) {
            return ResponseEntity.badRequest().body("Department name cannot be empty");
        }
        return departmentService.addDepartment(departmentName, isInternal);
    }

    @Operation(summary = "Delete a department")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteDepartment(@RequestParam String departmentName) {
        logger.info("Deleting department " + departmentName);
        if (departmentName == null || departmentName.isEmpty()) {
            return ResponseEntity.badRequest().body("Department name cannot be empty");
        }
        if (!departmentService.isDepartmentExists(departmentName)) {
            return ResponseEntity.badRequest().body("Department does not exist");
        }
        departmentService.deleteDepartment(departmentName);
        return ResponseEntity.ok("Department deleted successfully");
    }

    @Operation(summary = "Get department by name")
    @GetMapping("/getDepartment")
    public ResponseEntity<Department> getDepartment(@RequestParam String departmentName) {
        logger.info("Getting department " + departmentName);
        return departmentService.getDepartmentByName(departmentName);
    }

    @Operation(summary = "Get all departments")
    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments(
            @RequestParam(required = false) Boolean isInternal) {
        logger.info("Getting all departments with isInternal=" + isInternal);
        List<Department> departments = departmentService.getDepartmentsByInternalStatus(isInternal);
        logger.info("Found {} departments", departments.size());
        if (departments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(departments);
    }

    @Operation(summary = "Get all department names")
    @GetMapping("/all")
    public ResponseEntity<List<Department>> getAllDepartmentNames() {
        logger.info("Getting all department names");
        List<Department> departments = departmentService.getAllDepartments();
        if (departments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(departments);
    }
}
