package cn.darkshadow.security.filter;

import org.springframework.util.DigestUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2016/11/30
 * @project: beauty
 * @packageName: cn.darkshadow.security.filter
 * @description: XXXXXX
 */
public class AuthFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest req = (HttpServletRequest) request;
        final HttpServletResponse resp = (HttpServletResponse) response;
        final String token = req.getParameter("token");
        final String time = req.getParameter("time");
        final String sign = req.getParameter("sign");
        if(token == null || time == null || sign == null){
            resp.setStatus(300);
            return;
        }
        final String temp = token+time;
        final String serverSign = DigestUtils.md5DigestAsHex(temp.getBytes());
        if(!serverSign.equals(sign)){
            return;
        }
        final long current = System.currentTimeMillis();
        final long cat = Math.abs(current-Long.parseLong(time));
        if(cat > 60000){
            return;
        }
    }

    @Override
    public void destroy() {

    }
}
