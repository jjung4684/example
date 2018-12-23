package examples.boot.jpaexam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/members")
public class MemberController {
    @GetMapping("/login")
    public String login(){
        //  /resources/templates/members/login.html
        return "members/login"; // view name을 리턴한다.
    }
}
