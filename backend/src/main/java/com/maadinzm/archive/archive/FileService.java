package com.maadinzm.archive.archive;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@Service
@RequiredArgsConstructor
public class FileService {
    private final Logger logger = LogManager.getLogger(FileService.class);

    public String saveFile(MultipartFile file, String fileName, String directoryPath) throws IOException {
        String filePath = Paths.get(directoryPath)
                .resolve(fileName)
                .normalize()
                .toString();

        validateFilePath(filePath);

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
            logger.info("File saved successfully: {}", filePath);
            return filePath;
        } catch (IOException e) {
            logger.error("Failed to save file: {}", fileName, e);
            throw new IOException("Failed to save file: " + fileName, e);
        }
    }

    private void validateFilePath(String filePath) {
        String normalizedBasePath = Paths.get(ArchiveService.archivesPath).toString();
        String normalizedFilePath = Paths.get(filePath).toAbsolutePath().normalize().toString();

        if (!normalizedFilePath.startsWith(normalizedBasePath)) {
            throw new SecurityException("Invalid file path detected");
        }
    }
}