package examples.boot.jpaexam.service;

import examples.boot.jpaexam.domain.Board;
import examples.boot.jpaexam.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {
    BoardRepository boardRepository;
    public BoardServiceImpl(BoardRepository boardRepository){
        this.boardRepository = boardRepository;
    }

    @Override
    public Page<Board> getBoards(int page) {
        Pageable pageable = PageRequest.of(page -1, 2);
        return boardRepository.getBoards(pageable);
    }
}