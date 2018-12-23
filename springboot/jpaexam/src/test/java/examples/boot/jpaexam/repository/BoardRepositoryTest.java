package examples.boot.jpaexam.repository;

import examples.boot.jpaexam.domain.Board;
import examples.boot.jpaexam.domain.BoardFile;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BoardRepositoryTest {

//    @Test
//    public void contextLoads(){
//
//    }
//
//    @Test
//    public void configTest(){
//
//    }
//
//    @Before
//    public void init(){
//        System.out.println("before");
//    }
//
//    @After
//    public void destory(){
//        System.out.println("after");
//
//    }
//
//    @Test
//    public void getBoardId1() throws Exception{
//        System.out.println("BoardId1");
//    }
//
//    @Test
//    public void getBoardId2() throws Exception{
//        System.out.println("BoardId2");
//    }
//
//    @Test
//    public void getBoardId3() throws Exception{
//        System.out.println("BoardId3");
//    }

    @Autowired
    BoardRepository boardRepository; // test 할 대상을 선언

    @Test
    public void testGetBoards() throws Exception{
        PageRequest pageable = PageRequest.of(1, 2);
        Page<Board> boardPage = boardRepository.getBoards(pageable);
        System.out.println("page count " + boardPage.getTotalPages());
        System.out.println("element count " + boardPage.getTotalElements());
        for(Board board:boardPage){
            System.out.println(board.getId());
        }
    }

    @Test
    public void testGetBoardById() throws Exception{
        System.out.println("------------------------------------");
        Board board = boardRepository.getOne(1L); // 1L 키를 가진 Board정보를 요청
        System.out.println(board.getClass().getName());
        System.out.println(board.getId() + " , " + board.getTitle());
        System.out.println(board.getMember().getName());
        System.out.println("------------------------------------");
    }

    @Test
    public void testGetBoardById2() throws Exception{
        System.out.println("------------------------------------");
        Board board = boardRepository.getBoardById(1L); // 사용자가 정의한 메소드
        System.out.println(board.getClass().getName());
        System.out.println(board.getId() + " , " + board.getTitle());
        System.out.println(board.getMember().getName());
        System.out.println("------------------------------------");
    }

    @Test
    public void testGetBoardById3() throws Exception{
        System.out.println("------------------------------------");
        Board board = boardRepository.getBoard(1L); // 사용자가 정의한 메소드
        System.out.println(board.getClass().getName());
        System.out.println(board.getId() + " , " + board.getTitle());
        System.out.println(board.getMember().getName());
        System.out.println("------------------------------------");
    }

    @Test
    public void testGetBoardById4() throws Exception{
        System.out.println("------------------------------------");
        Board board = boardRepository.getBoardByDsl(1L); // 사용자가 정의한 메소드
        System.out.println(board.getClass().getName());
        System.out.println(board.getId() + " , " + board.getTitle());
        System.out.println(board.getMember().getName());
        System.out.println("------------------------------------");
    }

    @Test
    public void testGetBoardList1() throws Exception{
        System.out.println("------------------------------------");
        List<Board> list = boardRepository.getBoards();
        for(Board board : list){
            System.out.println(board.getId() + " , " + board.getTitle());
            System.out.println("*************************************");
            List<BoardFile> boardFiles = board.getBoardFiles();
            for(BoardFile boardFile : boardFiles){
                System.out.println(boardFile.getName());
            }
            System.out.println("*************************************");
        }
        System.out.println("------------------------------------");
    }
}
