package com.maadinzm.archive.archive;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchiveRepository  extends JpaRepository<Archive, Long>, JpaSpecificationExecutor<Archive> {

}
