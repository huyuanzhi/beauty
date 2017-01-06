package test;

import cn.darkshadow.commons.util.Base64;
import cn.darkshadow.commons.util.RSACoder;
import cn.darkshadow.commons.util.RSAEncrypt;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.cookie.Cookie;
import org.apache.http.cookie.CookieSpecProvider;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.cookie.BestMatchSpecFactory;
import org.apache.http.impl.cookie.BrowserCompatSpecFactory;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.springframework.util.DigestUtils;
import sun.misc.Regexp;

import javax.crypto.Cipher;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static javafx.scene.input.DataFormat.FILES;
import static javafx.scene.input.DataFormat.PLAIN_TEXT;

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
        //CookieStore cookieStore = new BasicCookieStore();
        BasicCookieStore cookieStore = new BasicCookieStore();
        Registry<CookieSpecProvider> cookieSpecRegistry = RegistryBuilder
                .<CookieSpecProvider> create()
                .register(CookieSpecs.BEST_MATCH, new BestMatchSpecFactory())
                .register(CookieSpecs.BROWSER_COMPATIBILITY,
                        new BrowserCompatSpecFactory()).build();
        CloseableHttpClient httpClient = HttpClients.custom()
                .setDefaultCookieStore(cookieStore).setDefaultCookieSpecRegistry(cookieSpecRegistry)
                .build();
        try {

            HttpGet get = new HttpGet("https://pan.baidu.com");
            String gid= "DC5A404-8A7E-438C-A974-7682A961D0BB";
            //BasicClientCookie cookie = new BasicClientCookie("name", "zhaoke");
           /* cookie.setVersion(0);
            cookie.setDomain("/pms/");   //设置范围
            cookie.setPath("/");
            cookieStore.addCookie(cookie);*/
            httpClient.execute(get);//
            List<Cookie> cookies = cookieStore.getCookies();
            for (int i = 0; i < cookies.size(); i++) {
                System.out.println("第一次cookie: " + cookies.get(i));
            }
            get = new HttpGet("https://passport.baidu.com/v2/api/?getapi&tpl=netdisk&subpro=netdisk_web&apiver=v3&tt=1474734220102&class=login&gid=DC5A404-8A7E-438C-A974-7682A961D0BB&logintype=basicLogin&callback=bd__cbs__xxxsf");
            HttpResponse response = httpClient.execute(get);
            HttpEntity entity = response.getEntity();
            String content = EntityUtils.toString(entity);

            String tokenStr = content.substring(content.indexOf("(")+1,content.lastIndexOf(")"));

           JSONObject object = JSON.parseObject(tokenStr);
            System.out.println(object);
            JSONObject data = object.getJSONObject("data");
            String token = data.getString("token");
            ScriptEngineManager manager = new ScriptEngineManager();
            ScriptEngine engine = manager.getEngineByName("javascript");
            String tt = "" + (new Date()).getTime();
            String baseUrl = "https://passport.baidu.com/v2/getpublickey?token=%s&tpl=netdisk&subpro=netdisk_web&apiver=v3&tt=%s&gid=%s&callback=bd__cbs__fbzosu";
            String requestUrl = String.format(baseUrl, token, tt, "DC5A404-8A7E-438C-A974-7682A961D0BB");
            get = new HttpGet(requestUrl);
            HttpResponse rsaResponse = httpClient.execute(get);
            HttpEntity rsaEntity = rsaResponse.getEntity();
            String publicKeyStr = EntityUtils.toString(rsaEntity);
            publicKeyStr = publicKeyStr.substring(publicKeyStr.indexOf('(') + 1, publicKeyStr.lastIndexOf(')'));
            JSONObject jsonObject = JSON.parseObject(publicKeyStr);
            String rsaKey = jsonObject.getString("key");
            String pubKey = jsonObject.getString("pubkey");
            HttpPost post = new HttpPost("https://passport.baidu.com/v2/api/?login");
            List<NameValuePair> nvps = new ArrayList<NameValuePair>();
            nvps.add(new BasicNameValuePair("staticpage", "https://pan.baidu.com/res/static/thirdparty/pass_v3_jump.html"));
            nvps.add(new BasicNameValuePair("charset", "utf-8"));
            nvps.add(new BasicNameValuePair("token", token));
            nvps.add(new BasicNameValuePair("tpl", "netdisk"));
            nvps.add(new BasicNameValuePair("subpro", "netdisk_web"));
            nvps.add(new BasicNameValuePair("apiver", "v3"));
            nvps.add(new BasicNameValuePair("tt", new Date().getTime() + ""));
            nvps.add(new BasicNameValuePair("codestring", ""));
            nvps.add(new BasicNameValuePair("safeflg", "0"));
            nvps.add(new BasicNameValuePair("u", "https://pan.baidu.com/disk/home"));
            nvps.add(new BasicNameValuePair("isPhone", "false"));
            nvps.add(new BasicNameValuePair("detect", "1"));
            nvps.add(new BasicNameValuePair("gid", "DC5A404-8A7E-438C-A974-7682A961D0BB"));
            nvps.add(new BasicNameValuePair("quick_user", "0"));
            nvps.add(new BasicNameValuePair("logintype", "basicLogin"));
            nvps.add(new BasicNameValuePair("logLoginType", "pc_loginBasic"));
            nvps.add(new BasicNameValuePair("idc", ""));
            nvps.add(new BasicNameValuePair("loginmerge", "true"));
            nvps.add(new BasicNameValuePair("foreignusername", ""));
            nvps.add(new BasicNameValuePair("username", "691982887@qq.com"));


            File f=new File("d:/rsa.js");

            Reader r= new InputStreamReader(new FileInputStream(f));
            engine.eval(r);
            Object newJSEncrypt = engine.get("newJSEncrypt");
            Invocable inv=(Invocable)engine;
            inv.invokeMethod(newJSEncrypt, "setKey",pubKey);
            String value = (String) inv.invokeMethod(newJSEncrypt,"encrypt","huyuanzhi");


            nvps.add(new BasicNameValuePair("password", value));
            nvps.add(new BasicNameValuePair("rsakey", rsaKey));
            nvps.add(new BasicNameValuePair("crypttype", "12"));
            nvps.add(new BasicNameValuePair("ppui_logintime", "60361"));
            nvps.add(new BasicNameValuePair("countrycode", ""));
            nvps.add(new BasicNameValuePair("callback", "parent.bd__pcbs__qqtx9j"));
            post.setEntity(new UrlEncodedFormEntity(nvps));
            httpClient.execute(post);
            get = new HttpGet("http://pan.baidu.com/api/list?dir=%2F");
            HttpResponse fileResponse = httpClient.execute(get);
            HttpEntity e = fileResponse.getEntity();
            System.out.println(EntityUtils.toString(e));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
