package com.maadinzm.archive.archive;

import com.maadinzm.archive.dtos.ArchiveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArchiveValidationService {
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    public void validateArchiveRequest(ArchiveRequest request) {
        validateBasicFields(request);
        validateFiles(request.getFiles());
        validateType(request.getType());
        validateDepartment(request.getDepartment());
    }

    private void validateDepartment(String department) {
        if (department == null || department.isEmpty()) {
            throw new IllegalArgumentException("Department is required");
        }
    }

    private void validateBasicFields(ArchiveRequest request) {
        if (request.getName() == null || request.getName().isEmpty()) {
            throw new IllegalArgumentException("Archive name is required");
        }
        if (request.getDate() == null) {
            throw new IllegalArgumentException("Archive date is required");
        }
    }

    private void validateFiles(List<MultipartFile> files) {
        if (files != null && !files.isEmpty()) {
            files.forEach(file -> {
                if (file.getSize() > MAX_FILE_SIZE) {
                    throw new IllegalArgumentException("File size exceeds limit: " + file.getOriginalFilename());
                }
                if (file.getOriginalFilename() == null || file.getOriginalFilename().isEmpty()) {
                    throw new IllegalArgumentException("Invalid file name");
                }
            });
        }
    }

    private void validateType(String type) {
        if (type == null || type.isEmpty()) {
            throw new IllegalArgumentException("Archive type is required");
        }
        if (!ArchiveType.isValid(type)) {
            throw new IllegalArgumentException("Invalid archive type: must be 'وارد' or 'صادر'");
        }
    }
}