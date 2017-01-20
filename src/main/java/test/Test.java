package test;

import cn.darkshadow.Application;
import cn.darkshadow.api.service.EhcacheService;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
public class Test {

    @Resource
    private EhcacheService ehcacheService;

    @org.junit.Test
    public void test(){
        ehcacheService.set("a","123");
        String aa = ehcacheService.get("a");
        System.out.println(aa);
    }
}
