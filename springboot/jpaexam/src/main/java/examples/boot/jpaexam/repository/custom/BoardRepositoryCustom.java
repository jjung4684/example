package examples.boot.jpaexam.repository.custom;

import examples.boot.jpaexam.domain.Board;

public interface BoardRepositoryCustom {
    public Board getBoardByDsl(Long id);
}
