package examples.boot.jpaexam.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .requestMatchers(new AntPathRequestMatcher("/**.html"))
                .requestMatchers(new AntPathRequestMatcher("/static/**"));
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/boards")
                .permitAll()
                .and().authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/boards/writeform").hasRole("USER")
                .antMatchers(HttpMethod.POST,"/boards").hasRole("USER")
                .antMatchers("/boards/**").permitAll()
                .antMatchers("/members/joinform").permitAll()
                .antMatchers(HttpMethod.POST,"/members").permitAll()
                .antMatchers("/members/welcome").permitAll()
                .antMatchers("/members/login").permitAll()
                .antMatchers("/members/**").hasRole("USER")
                .antMatchers("/api/**").hasRole("USER")
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/h2-console/**").permitAll()
                .anyRequest().fullyAuthenticated()
                .and().csrf() // h2콘솔에서 필요
                .ignoringAntMatchers("/**")
                .and()  // h2콘솔에서 필요
                .headers().frameOptions().disable()
                .and().formLogin()
                .loginPage("/members/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .loginProcessingUrl("/members/login"); // post방식으로 전달.
    }
}