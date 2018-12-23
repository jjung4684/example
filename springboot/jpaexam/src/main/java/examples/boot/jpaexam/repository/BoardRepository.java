package examples.boot.jpaexam.repository;

import examples.boot.jpaexam.domain.Board;
import examples.boot.jpaexam.repository.custom.BoardRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

// Entity클래스, Id Type클래스가 제네릭으로 온다.
public interface BoardRepository
        extends JpaRepository<Board, Long>, BoardRepositoryCustom {
    public Board getBoardById(Long id); // method query의 추가

    @Query("SELECT b FROM Board b WHERE b.id = :id")
    public Board getBoard(@Param("id") Long id);

    @Query("SELECT distinct b FROM Board b left join fetch b.boardFiles order by b.id")
    public List<Board> getBoards();

    @Query(value = "SELECT distinct b FROM Board b join fetch b.member order by b.id desc",
            countQuery = "SELECT count(b) FROM Board b")
    public Page<Board> getBoards(Pageable page);
}