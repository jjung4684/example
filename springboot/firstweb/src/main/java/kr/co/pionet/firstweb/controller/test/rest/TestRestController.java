package kr.co.pionet.firstweb.controller.test.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * RestController Test
 */
@RestController
@RequestMapping("rest")
public class TestRestController {

    @GetMapping("/test")
    public String helloWorld() {

        return "Hello RestController Test";
    }

    @GetMapping("/week2/testAjax")
    public String example(@ModelAttribute Map searchVo){

        return searchVo.toString();
    }

    @GetMapping("/week2/{var2}")
    public String example(@PathVariable String var2, @RequestParam String search, ModelMap map){

        System.out.println("=========== PathVariable var :"+var2);
        System.out.println("=========== RequestParam search :"+search);

        return "PathVariable var :"+var2 +" // RequestParam search :"+search;
    }
}
