package examples.boot.jpaexam.controller;

import examples.boot.jpaexam.domain.Board;
import examples.boot.jpaexam.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;

@Controller
@RequestMapping("/boards")
public class BoardController {
    @Autowired
    BoardService boardService;

    //  /boards    1page를 보여준다.
    //  /boards?page=1
    //  /boards?page=2
    @GetMapping
    public String boards(
            Principal principal,
            @RequestParam(name = "page",
                    required = false,
                    defaultValue = "1")
                    int page, ModelMap modelMap){

        if(principal != null)
            System.out.println("pricipal name :" + principal.getName());

        Page<Board> boardPage = boardService.getBoards(page);
        System.out.println("================================");
        // 템플릿에게 전달한다.
        modelMap.addAttribute("boardPage", boardPage);
        return "boards/list";
    }
}