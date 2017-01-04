package cn.darkshadow.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2016/12/1
 * @project: beauty
 * @packageName: cn.darkshadow.api.controller
 * @description: XXXXXX
 */
@Controller
public class TopicController {

    @RequestMapping(value = "/index")
    private String index(Model model){
        model.addAttribute("m","hello");
        return "index";
    }
}
