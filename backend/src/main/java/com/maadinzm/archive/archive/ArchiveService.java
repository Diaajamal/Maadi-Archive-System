package com.maadinzm.archive.archive;

import com.maadinzm.archive.department.Department;
import com.maadinzm.archive.department.DepartmentService;
import com.maadinzm.archive.dtos.ArchiveDTO;
import com.maadinzm.archive.dtos.ArchiveRequest;
import com.maadinzm.archive.dtos.PaginatedResponse;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.UUID.randomUUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArchiveService {

    public static final String archivesPath = Paths.get("ArchiveFiles")
            .toAbsolutePath()
            .normalize()
            .toString();

    private final ArchiveRepository archiveRepository;
    private final FileService fileService;
    private final DepartmentService departmentService;


    private final Logger logger = LogManager.getLogger(ArchiveService.class);

    @Transactional
    public void saveArchive(ArchiveRequest archiveRequest) {
        logger.info("Saving archiveRequest: {}", archiveRequest);

        // Validate department existence
        if (!departmentService.isDepartmentExists(archiveRequest.getDepartment())) {
            throw new IllegalArgumentException("Department does not exist");
        }

        try {
            // Create Archive object from request
            Archive archive = createArchiveFromRequest(archiveRequest);

            // Save files and get their paths
            List<String> savedFilePaths = saveFiles(archiveRequest.getFiles(), archiveRequest.getDate(), archiveRequest.getType());

            // Set file paths and file count
            archive.setFilePaths(savedFilePaths);
            archive.setNumberOfFiles(savedFilePaths.size());

            // Save archive to repository
            archiveRepository.save(archive);
            logger.info("Archive saved successfully: {}", archive);

        } catch (Exception e) {
            logger.error("Error saving archive: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to save archive", e);
        }
    }

    private Archive createArchiveFromRequest(ArchiveRequest request) {
        Department department = departmentService.getDepartmentByName(request.getDepartment()).getBody();
        if (department == null) {
            throw new IllegalArgumentException("Department not found");
        }
        Archive archive = new Archive();
        archive.setName(request.getName());
        archive.setDescription(request.getDescription());
        archive.setDepartment(department);
        archive.setType(ArchiveType.fromValue(request.getType()));
        archive.setDate(request.getDate());
        archive.setArchiveNumber(request.getArchiveNumber() != null ? request.getArchiveNumber() : 0);
        archive.setFileNumber(request.getFileNumber() != null ? request.getFileNumber() : 0);
        return archive;
    }

    private List<String> saveFiles(List<MultipartFile> files, LocalDate date, String type) throws IOException {
        if (files == null || files.isEmpty()) {
            // Handle the case where files is null or empty
            return Collections.emptyList();
        }
        List<String> filePaths = new ArrayList<>();

        for (MultipartFile file : files) {
            String fileName = generateFileName(file, date, type);
            String filePath = fileService.saveFile(file, fileName, archivesPath);
            filePaths.add(filePath);
        }

        return filePaths;
    }


    private String generateFileName(MultipartFile file, LocalDate date, String type) {
        String sanitizedFilename = sanitizeFileName(file.getOriginalFilename());
        String uniqueId = generateUniqueFilename(date);
        return String.format("%s_%s_%s", uniqueId, type, sanitizedFilename);
    }

    private String sanitizeFileName(String fileName) {
        if (fileName == null) {
            throw new IllegalArgumentException("File name cannot be null");
        }
        return fileName.replaceAll("[^a-zA-Z0-9._-]", "_");
    }

    private String generateUniqueFilename(LocalDate date) {
        return date.toString() + "&&" + randomUUID().toString().substring(0, 8);
    }

    public PaginatedResponse<ArchiveDTO> getAllArchives(
            int page,
            int size,
            LocalDate startDate,
            LocalDate endDate,
            ArchiveType type,
            String department,
            Integer archiveNumber,
            Integer fileNumber
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        Page<Archive> archivePage = fetchArchives(startDate, endDate, type, department, archiveNumber, fileNumber, pageable);

        List<ArchiveDTO> dtos = archivePage.getContent()
                .stream()
                .map(ArchiveDTO::fromArchive)
                .collect(Collectors.toList());

        return createPaginatedResponse(archivePage, dtos);
    }

    private Page<Archive> fetchArchives(
            LocalDate startDate,
            LocalDate endDate,
            ArchiveType type,
            String department,
            Integer archiveNumber,
            Integer fileNumber,
            Pageable pageable
    ) {
        return archiveRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Add predicates for each filter
            if (archiveNumber != null) {
                predicates.add(criteriaBuilder.equal(root.get("archiveNumber"), archiveNumber));
            }
            if (fileNumber != null) {
                predicates.add(criteriaBuilder.equal(root.get("fileNumber"), fileNumber));
            }
            if (startDate != null && endDate != null) {
                predicates.add(criteriaBuilder.between(root.get("date"), startDate, endDate));
            }
            if (type != null) {
                predicates.add(criteriaBuilder.equal(root.get("type"), type));
            }
            if (department != null && !department.isEmpty()) {
                Department departmentEntity = departmentService.getDepartmentByName(department).getBody();
                if (departmentEntity != null) {
                    predicates.add(criteriaBuilder.equal(root.get("department"), departmentEntity));
                }
            }

            // Combine all predicates
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }

    private PaginatedResponse<ArchiveDTO> createPaginatedResponse(Page<Archive> page, List<ArchiveDTO> content) {
        return new PaginatedResponse<>(
                content,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}