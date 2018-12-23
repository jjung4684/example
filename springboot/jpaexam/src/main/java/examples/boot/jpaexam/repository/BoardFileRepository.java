package examples.boot.jpaexam.repository;

import examples.boot.jpaexam.domain.BoardFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {
}
