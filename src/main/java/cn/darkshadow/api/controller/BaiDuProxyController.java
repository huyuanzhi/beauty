package cn.darkshadow.api.controller;

import cn.darkshadow.api.domain.BaiDuContext;
import cn.darkshadow.api.service.EhcacheService;
import cn.darkshadow.commons.util.BaiduHttpClientUtils;
import org.apache.commons.io.FileUtils;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/20
 * @project: beauty
 * @packageName: cn.darkshadow.api.controller
 * @description: XXXXXX
 */
@Controller
@RequestMapping(value = "/front/baidu/proxy")
public class BaiDuProxyController {

    @Autowired
    private EhcacheService ehcacheService;

    @RequestMapping(value = "/login")
    private Object login(HttpServletRequest request){
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        HttpClient client;
        Map<String, String> context = new HashMap<>();
        CookieStore cookieStore;
        HttpGet get;
        try {
            cookieStore = new BasicCookieStore();
            List<Header> headers = new ArrayList<Header>();
            headers.add(new BasicHeader("user-agent",
                    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/35.0"));
            client = HttpClients.custom().setDefaultCookieStore(cookieStore)
                    .setDefaultHeaders(headers).build();
            get = new HttpGet();
            get.setURI(new URI("http://pan.baidu.com/"));
            client.execute(get);
            BaiduHttpClientUtils.getToken(client,context);
            context.put("username", username);
            context.put("pass", password);
            context.put("gid","DC5A404-8A7E-438C-A974-7682A961D0BB");
            BaiduHttpClientUtils.Encrypt(client,context);
            String code = BaiduHttpClientUtils.login(context,client);
            switch (Integer.valueOf(code)) {
                case 257:
                    get.setURI(new URI("https://passport.baidu.com/cgi-bin/genimage?"
                            + context.get("codeString")));
                    HttpResponse res = client.execute(get);
                    File file = new File("D:/baidu/" + context.get("username") + ".gif");
                    FileUtils.touch(file);
                    OutputStream os = new FileOutputStream(file);
                    res.getEntity().writeTo(os);
                    os.close();
                    BaiduHttpClientUtils.volidate(context,client);
                    break;
                case 0:
                    System.out.println("登陆成功");
                default:
                    break;
            }
        } catch (Exception e) {
            System.out.println("init fail!");
            e.printStackTrace();
        }


        return null;
    }

    @RequestMapping(value = "/list")
    private ResponseEntity getFileListByPath(String path) throws Exception {
        HttpGet get = new HttpGet();
        BaiDuContext context = ehcacheService.get("691982887@qq.com");
        HttpClient client =context.getClient();
        get.setURI(new URI("https://pan.baidu.com/api/list?order=time&desc=1&showempty=0&web=1&page=1&num=100&dir=%2F"));
        HttpResponse   response = client.execute(get);
        return new ResponseEntity(response.getEntity(),HttpStatus.OK);
    }

}
