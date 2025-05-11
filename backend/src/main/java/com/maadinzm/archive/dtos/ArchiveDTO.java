package com.maadinzm.archive.dtos;

import com.maadinzm.archive.archive.Archive;
import com.maadinzm.archive.archive.ArchiveType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArchiveDTO {
    private Long id;
    private String name;
    private String type;
    private LocalDate date;
    private String department;
    private Boolean isInternal;
    private String description;
    private int archiveNumber;
    private int fileNumber;
    private List<String> filePaths;

    public static ArchiveDTO fromArchive(Archive archive) {
        return new ArchiveDTO(
                archive.getId(),
                archive.getName(),
                archive.getType() == ArchiveType.INCOMING ? "وارد" : "صادر",
                archive.getDate(),
                archive.getDepartment().getName(),
                archive.getDepartment().getIsInternal(),
                archive.getDescription(),
                archive.getArchiveNumber(),
                archive.getFileNumber(),
                new ArrayList<>(archive.getFilePaths())
        );
    }
}
