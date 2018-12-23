package examples.boot.jpaexam.repository.custom;

import examples.boot.jpaexam.domain.Board;
import examples.boot.jpaexam.domain.QBoard;
import org.springframework.data.jpa.repository.support.QuerydslJpaRepository;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class BoardRepositoryImpl extends QuerydslRepositorySupport implements BoardRepositoryCustom  {

    public BoardRepositoryImpl(){
        super(Board.class); // 부모에게 사용할 Entity class를 설정한다.
    }

    // @Query("SELECT b FROM Board b WHERE b.id = :id")
    @Override
    public Board getBoardByDsl(Long id) {
        QBoard qBoard = QBoard.board;
//        JPQLQuery<Board> jpqlQuery = from(qBoard);// FROM Board
//        jpqlQuery = jpqlQuery.where(qBoard.id.eq(id));// FROM Board Where b.id = :id
//        return jpqlQuery.fetchOne();

        return from(qBoard).where(qBoard.id.eq(id)).fetchOne();

    }
}
