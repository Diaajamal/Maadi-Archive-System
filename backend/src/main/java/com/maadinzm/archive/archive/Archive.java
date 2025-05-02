package com.maadinzm.archive.archive;

import com.maadinzm.archive.department.Department;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "archives")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "filePaths")
public class Archive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "archive_number")
    private Integer archiveNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_name", referencedColumnName = "name")
    private Department department;

    @Column(name = "file_number")
    private Integer fileNumber;

    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ArchiveType type;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
            name = "archive_files",
            joinColumns = @JoinColumn(name = "archive_id"),
            foreignKey = @ForeignKey(name = "fk_archive_files")
    )
    @Column(name = "file_path",nullable = true)
    private List<String> filePaths= new ArrayList<>();

    @Column(name = "number_of_files", nullable = false)
    private int numberOfFiles;

    @Column(nullable = false)
    private LocalDate date;

}
