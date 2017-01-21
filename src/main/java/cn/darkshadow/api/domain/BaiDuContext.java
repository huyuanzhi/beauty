package cn.darkshadow.api.domain;

import org.apache.http.Header;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClients;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/20
 * @project: beauty
 * @packageName: cn.darkshadow.api.domain
 * @description: XXXXXX
 */
public class BaiDuContext implements Serializable{

    private String username;
    private transient HttpClient client;
    private List<Header> headers;
    private CookieStore cookieStore;
    private Map<String,String> context;

    public BaiDuContext() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public HttpClient getClient() {
        return client = HttpClients.custom().setDefaultCookieStore(cookieStore)
                .setDefaultHeaders(headers).build();
    }

    public void setClient(HttpClient client) {
        this.client = client;
    }

    public List<Header> getHeaders() {
        return headers;
    }

    public void setHeaders(List<Header> headers) {
        this.headers = headers;
    }

    public CookieStore getCookieStore() {
        return cookieStore;
    }

    public void setCookieStore(CookieStore cookieStore) {
        this.cookieStore = cookieStore;
    }

    public Map<String, String> getContext() {
        return context;
    }

    public void setContext(Map<String, String> context) {
        this.context = context;
    }
}
