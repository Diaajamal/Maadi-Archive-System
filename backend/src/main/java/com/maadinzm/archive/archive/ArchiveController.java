package com.maadinzm.archive.archive;

import com.maadinzm.archive.department.DepartmentService;
import com.maadinzm.archive.dtos.ArchiveDTO;
import com.maadinzm.archive.dtos.ArchiveRequest;

import com.maadinzm.archive.dtos.PaginatedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/archive")
@Tag(name = "Archive", description = "Archive management operations")
public class ArchiveController {
    private final ArchiveService archiveService;
    private final ArchiveValidationService validationService;
    private final DepartmentService departmentService;
    private final Logger logger = LogManager.getLogger(ArchiveController.class);

    @Operation(summary = "Add a new archive", description = "Saves a new archive with the provided details.")
    @PostMapping("/add")
    public ResponseEntity<String> addArchive(@ModelAttribute ArchiveRequest archiveRequest) {
        logger.info("Adding new archive");
        validationService.validateArchiveRequest(archiveRequest);
        if (!departmentService.isDepartmentExists(archiveRequest.getDepartment())) {
            return  ResponseEntity.badRequest().body("Department does not exist");
        }
        archiveService.saveArchive(archiveRequest);
        return ResponseEntity.ok("Archive saved successfully");
    }

    @Operation(summary = "Get all archives", description = "Fetches a paginated list of archives.")
    @GetMapping("/all")
    public ResponseEntity<PaginatedResponse<ArchiveDTO>> getAllArchives(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer archiveNumber,
            @RequestParam(required = false) Integer fileNumber
    ) {

        logger.info("Get all archives");
        LocalDate start = (startDate != null) ? LocalDate.parse(startDate) : null;
        LocalDate end = (endDate != null) ? LocalDate.parse(endDate) : null;
        ArchiveType archiveType = (type != null) ? ArchiveType.fromValue(type) : null;

        PaginatedResponse<ArchiveDTO> response = archiveService.getAllArchives(page, size, start, end, archiveType, department, archiveNumber, fileNumber);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Download Archive", description = "Download an archive file by its name")
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam String fileName) {
        logger.info("Downloading archive file {}", fileName);
        Path filePath = Paths.get(ArchiveService.archivesPath)
                .resolve(fileName)
                .normalize();

        if (!filePath.toAbsolutePath().startsWith(Paths.get(ArchiveService.archivesPath))) {
            return ResponseEntity.badRequest().build();
        }

        Resource resource = new FileSystemResource(filePath.toString());
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8)
                .replace("+", "%20"); // Replace '+' with '%20' for spaces

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename*=UTF-8''" + encodedFileName)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}