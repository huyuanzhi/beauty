package test;

import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.params.CookiePolicy;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.DefaultBHttpClientConnectionFactory;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.impl.cookie.BasicClientCookie;

import java.util.List;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/4
 * @project: beauty
 * @packageName: test
 * @description: XXXXXX
 */
public class HttpClientUtils {

    public static void main(String[] args) {
        CookieStore cookieStore = new BasicCookieStore();
        CloseableHttpClient httpClient = HttpClients.custom()
                .setDefaultCookieStore(cookieStore)
                .build();
        try {

            HttpPost post = new HttpPost("https://passport.baidu.com/v2/api/?getapi&tpl=dev&apiver=v3&tt=%s&class=login&gid=%s&logintype=dialogLogin");
            //BasicClientCookie cookie = new BasicClientCookie("name", "zhaoke");
           /* cookie.setVersion(0);
            cookie.setDomain("/pms/");   //设置范围
            cookie.setPath("/");
            cookieStore.addCookie(cookie);*/
            httpClient.execute(post);//
            List<Cookie> cookies = cookieStore.getCookies();
            for (int i = 0; i < cookies.size(); i++) {
                System.out.println("Local cookie: " + cookies.get(i));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally{

        }  }
}
