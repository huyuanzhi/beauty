package cn.darkshadow;

import cn.darkshadow.security.filter.AuthFilter;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		AuthFilter authFilter = new AuthFilter();
		registrationBean.setFilter(authFilter);
		List<String> urlPatterns = new ArrayList<>();
		urlPatterns.add("/api/user/*");
		registrationBean.setUrlPatterns(urlPatterns);
		return registrationBean;
	}

}