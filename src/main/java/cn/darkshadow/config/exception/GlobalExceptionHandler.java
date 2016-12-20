package cn.darkshadow.config.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2016/11/30
 * @project: beauty
 * @packageName: cn.darkshadow.config.exception
 * @description: XXXXXX
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> myExceptionHandler(Exception e, HttpServletRequest request){
        log.error("接口:{}出现错误:{},请求参数:{}",request.getRequestURI(),e.getMessage(),request.getParameterMap().toString());
        return ResponseEntity.badRequest()
                .contentType(MediaType.TEXT_PLAIN)
                .body("illegal request ");
    }

}
