package cn.darkshadow.commons.util;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import test.RSAUtil;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/21
 * @project: beauty
 * @packageName: cn.darkshadow.commons.util
 * @description: XXXXXX
 */
public class BaiduHttpClientUtils {

    public static void Encrypt(HttpClient client, Map<String,String> context) throws Exception {
        HttpGet get = new HttpGet();
        get.setURI(new URI("https://passport.baidu.com/v2/getpublickey?token="
                + context.get("token") + "&tpl=netdisk&apiver=v3&tt="
                + System.currentTimeMillis()+"&gid="
                + context.get("gid")));
        HttpResponse res = client.execute(get);
        String string = EntityUtils.toString(res.getEntity());
        Matcher matcher = Pattern.compile(
                "-----BEGIN PUBLIC KEY-----(.*)-----END PUBLIC KEY-----")
                .matcher(string);
        if (matcher.find()) {
            String s = matcher.group(1);
            context.put("pass", RSAUtil.encrypt(
                    s.replace("\\n", "").replace("\\/", "/"),
                    context.get("pass")));
        }
        Matcher matcher2 = Pattern.compile("\"key\":'(.+)'}$").matcher(string);
        if (matcher2.find()) {
            context.put("rsakey", matcher2.group(1));
        }
    }


    public static String getToken(HttpClient client, Map<String,String> context) throws Exception {
        HttpGet get = new HttpGet();
        get.setURI(new URI(
                "https://passport.baidu.com/v2/api/?getapi&class=login&tpl=netdisk&subpro=netdisk_web&callback=bd__cbs__xxxsf&tangram=true&gid="
                        + context.get("gid")+"&tt="
                        + System.currentTimeMillis()));
        HttpResponse res = client.execute(get);
        BufferedReader br = new BufferedReader(new InputStreamReader(res
                .getEntity().getContent()));
        String line;
        while ((line = br.readLine()) != null) {
            if (line.contains("login_token")) {
                String token = line.substring(line.indexOf("'") + 1,
                        line.lastIndexOf("'"));
                context.put("token", token);
                return context.get("token");
            }
        }
        return null;
    }

    public static String login(Map<String,String> context,HttpClient client) throws Exception {
        List<BasicNameValuePair> params = new ArrayList<BasicNameValuePair>() {
            @Override
            public boolean add(BasicNameValuePair e) {
                if (e.getValue() == null) {
                    e = new BasicNameValuePair(e.getName(), "");
                }
                return super.add(e);
            }
        };
        params.add(new BasicNameValuePair("staticpage",
                "https://pan.baidu.com/res/static/thirdparty/pass_v3_jump.html"));
        params.add(new BasicNameValuePair("charset", "utf-8"));
        params.add(new BasicNameValuePair("apiver", "v3"));
        params.add(new BasicNameValuePair("token", context.get("token")));
        params.add(new BasicNameValuePair("tpl", "netdisk"));
        params.add(new BasicNameValuePair("tt", System.currentTimeMillis() + ""));
        params.add(new BasicNameValuePair("safeflg", String.valueOf(0)));
        params.add(new BasicNameValuePair("u", "http://pan.baidu.com/disk/home"));
        params.add(new BasicNameValuePair("detect", "1"));
        params.add(new BasicNameValuePair("quick_user", "0"));
        params.add(new BasicNameValuePair("logintype", "basicLogin"));
        params.add(new BasicNameValuePair("logLoginType", "pc_loginBasic"));
        params.add(new BasicNameValuePair("subpro", "netdisk_web"));
        params.add(new BasicNameValuePair("idc", ""));
        params.add(new BasicNameValuePair("loginmerge", "true"));
        params.add(new BasicNameValuePair("rsakey", context.get("rsakey")));
        params.add(new BasicNameValuePair("username", context.get("username")));
        params.add(new BasicNameValuePair("password", context.get("pass")));
        params.add(new BasicNameValuePair("gid", context.get("gid")));
        params.add(new BasicNameValuePair("isPhone", "false"));
        params.add(new BasicNameValuePair("loginType", "1"));
        params.add(new BasicNameValuePair("index", "0"));
        params.add(new BasicNameValuePair("ppui_logintime", "302722"));
        params.add(new BasicNameValuePair("foreignusername", ""));
        params.add(new BasicNameValuePair("verifycode", context.get("verifycode")));
        params.add(new BasicNameValuePair("codestring", context.get("codestring")));
        params.add(new BasicNameValuePair("mem_pass", "on"));
        params.add(new BasicNameValuePair("callback", "parent.bd__pcbs__thto43"));
        params.add(new BasicNameValuePair("crypttype", "12"));
        HttpPost post = new HttpPost();
        post.setURI(new URI("https://passport.baidu.com/v2/api/?login"));
        post.setEntity(new UrlEncodedFormEntity(params, "utf-8"));
        HttpResponse res = client.execute(post);
        String string = EntityUtils.toString(res.getEntity());
        Matcher matcher = Pattern.compile("err_no=(\\d+)&").matcher(string);
        String errorCode = null;
        if (matcher.find()) {
            errorCode = matcher.group(1);
        } else {
            matcher = Pattern.compile("error=(\\d+)'").matcher(string);
            if (matcher.find()) {
                errorCode = matcher.group(1);
            }else{
                errorCode = "0";
            }
        }
        context.put("error",errorCode);
        Matcher codem = Pattern.compile("code[sS]tring=(\\w+)&")
                .matcher(string);
        if (codem.find()) {
            context.put("codeString", codem.group(1));
        }
        System.out.println(string);
        return errorCode;
    }

    public static void volidate(Map<String, String> context, HttpClient client) throws Exception {
        System.out.println("请输入验证码:");
        context.put("verifycode", new Scanner(System.in).next());
        HttpGet get = new HttpGet();
        get.setURI(new URI("https://passport.baidu.com/v2/?checkvcode&token="
                + context.get("token") + "&tpl=netdisk&apiver=v3&tt="
                + System.currentTimeMillis() + "&verifycode="
                + context.get("verifycode") + "&codestring="
                + context.get("codeString")));
        HttpResponse res = client.execute(get);
        Matcher m = Pattern.compile("no\": \"(\\d+)\"").matcher(
                EntityUtils.toString(res.getEntity()));
        if (m.find()) {
            switch (Integer.valueOf(m.group(1))) {
                case 500002:
                    System.out.println("验证码错误");
                    break;
                case 0:
                    System.out.println("验证成功");
                    login(context,client);
                    break;
                default:
                    break;
            }
        }
    }

}
