package com.maadinzm.archive.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArchiveRequest {

    @NotBlank
    private String name;

    @Builder.Default
    private String description = "لا يوجد";

    @NotBlank
    private String type;

    @NotBlank
    private String department;

    @Builder.Default
    private Integer archiveNumber = 0;

    @Builder.Default
    private Integer fileNumber = 0;

    @NotBlank
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
    private LocalDate date;

    private List<MultipartFile> files;
}
