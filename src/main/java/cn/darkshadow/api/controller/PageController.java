package cn.darkshadow.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/2/8
 * @project: beauty
 * @packageName: cn.darkshadow.api.controller
 * @description: XXXXXX
 */
@Controller
public class PageController {

    @RequestMapping(value = "/")
    private String index(){
        return "index";
    }
}
