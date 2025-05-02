package com.maadinzm.archive.config;

import com.maadinzm.archive.archive.ArchiveService;
import jakarta.annotation.PostConstruct;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class ArchiveDirectoryInitializer {

    private static final Logger LOGGER = LogManager.getLogger(ArchiveDirectoryInitializer.class);

    @PostConstruct
    public void init() {
        File archiveDir = new File(ArchiveService.archivesPath);
        if (!archiveDir.exists()) {
            if (!archiveDir.mkdirs()) {
                LOGGER.error("Failed to create archive directory: {}", ArchiveService.archivesPath);
            } else {
                LOGGER.info("Archive directory created successfully: {}", ArchiveService.archivesPath);
            }
        } else {
            LOGGER.info("Archive directory already exists: {}", ArchiveService.archivesPath);
        }
    }
}